import { View, Text, Image, Pressable, FlatList } from "react-native";
import { Comment } from "../app/types/types";
import { formatDistanceToNowStrict } from "date-fns";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { memo, useState } from "react";

type CommentListItemProps = {
  comment: Comment;
  depth: number;
  handleReplyPress: (commentId: string) => void;
};

const CommentListItem = ({
  comment,
  depth,
  handleReplyPress,
}: CommentListItemProps) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        borderLeftWidth: depth > 0 ? 1 : 0,
        borderLeftColor: "#E5E7EB",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Image
          source={{
            uri:
              comment.user.image || "https://avatar.iran.liara.run/public/boy",
          }}
          style={{
            width: 28,
            height: 28,
            borderRadius: 15,
            marginRight: 4,
          }}
        />
        <Text style={{ color: "#737373", fontWeight: "600", fontSize: 13 }}>
          {comment.user.name}
        </Text>
        <Text style={{ color: "#737373", fontSize: 13 }}>&#x2022;</Text>
        <Text style={{ color: "#737373", fontSize: 13 }}>
          {formatDistanceToNowStrict(new Date(comment.created_at))}
        </Text>
      </View>
      <Text>{comment.comment}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Entypo name="dots-three-horizontal" size={15} color="#737373" />
        <Octicons
          name="reply"
          size={16}
          color="#737373"
          onPress={() => handleReplyPress(comment.id)}
        />
        <MaterialCommunityIcons
          name="trophy-outline"
          size={16}
          color="#737373"
        />
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <MaterialCommunityIcons
            name="arrow-up-bold-outline"
            size={18}
            color="#737373"
          />
          <Text style={{ fontWeight: "500", color: "#737373" }}>
            {comment.upvotes}
          </Text>
          <MaterialCommunityIcons
            name="arrow-down-bold-outline"
            size={18}
            color="#737373"
          />
        </View>
      </View>
      {comment.replies.length > 0 && depth < 5 && !showReplies && (
        <Pressable
          onPress={() => setShowReplies(true)}
          style={{
            backgroundColor: "#EDEDED",
            borderRadius: 3,
            paddingVertical: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 0.5,
              fontWeight: "500",
              color: "#545454",
            }}
          >
            Show replies
          </Text>
        </Pressable>
      )}
      {showReplies && (
        <FlatList
          data={comment.replies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentListItem
              comment={item}
              depth={depth + 1}
              handleReplyPress={handleReplyPress}
            />
          )}
        />
      )}
    </View>
  );
};

export default memo(CommentListItem);
