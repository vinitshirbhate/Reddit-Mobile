import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import groups from "../../../assets/data/groups.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const GroupSelector = () => {
  const [searchText, setSearchText] = useState<string>("");
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={groups}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default GroupSelector;
