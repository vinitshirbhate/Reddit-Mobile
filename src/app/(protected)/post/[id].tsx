import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { formatDistanceToNowStrict } from "date-fns";
import posts from "../../../../assets/data/posts.json";
import comments from "../../../../assets/data/comments.json";
import PostListItem from "../../../componets/PostListItems";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useRef, useState } from "react";
import CommentListItem from "../../../componets/CommentListItem";

export default function DetailedPost() {
  const inset = useSafeAreaInsets();

  const { id } = useLocalSearchParams();

  const [comment, setComment] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const detailedPost = posts.find((post) => post.id === id);
  const postComments = comments.filter(
    (comment) => comment.post_id === detailedPost?.id
  );

  if (!detailedPost) return <Text>Post not found</Text>;

  const handleReplyPress = useCallback((commentId: string) => {
    console.log(commentId);
    inputRef.current?.focus();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={inset.top + 10}
    >
      <FlatList
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
        data={postComments}
        renderItem={({ item }) => (
          <CommentListItem
            comment={item}
            depth={0}
            handleReplyPress={handleReplyPress}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* Post a Comment */}
      <View
        style={{
          paddingBottom: inset.bottom,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,

          elevation: 4,
        }}
      >
        <TextInput
          placeholder="Join the discussion"
          value={comment}
          onChangeText={setComment}
          style={{
            borderWidth: 0,
            padding: 0,
            marginBottom: 10,
          }}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {isInputFocused && (
          <Pressable
            disabled={!comment}
            onPress={() => console.error("Pressed")}
            style={{
              backgroundColor: !comment ? "lightgrey" : "#0d469b",
              borderRadius: 15,
              marginLeft: "auto",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              Reply
            </Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
