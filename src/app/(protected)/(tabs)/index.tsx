import { FlatList, View } from "react-native";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../componets/PostListItems";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
