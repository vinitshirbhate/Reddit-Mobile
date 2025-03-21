import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import groups from "../../../assets/data/groups.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../atom";
import { router } from "expo-router";
import { Group } from "../types/types";

const GroupSelector = () => {
  const [searchText, setSearchText] = useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            name="close"
            size={30}
            color="black"
            onPress={() => router.back()}
          />
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              paddingRight: 30,
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            Post to
          </Text>
        </View>
        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "lightgrey",
            borderRadius: 5,
            gap: 5,
            marginVertical: 10,
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <AntDesign name="search1" size={16} color="gray" />
          <TextInput
            placeholder="Search for a community"
            placeholderTextColor={"gray"}
            style={{ paddingVertical: 10, flex: 1 }}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          {searchText && (
            <AntDesign
              name="closecircle"
              size={15}
              color="#E4E4E4"
              onPress={() => setSearchText("")}
            />
          )}
        </View>

        <FlatList
          data={filteredGroups}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onGroupSelected(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
              />
              <View>
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ color: "gray" }}>recenty Visited</Text>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default GroupSelector;
