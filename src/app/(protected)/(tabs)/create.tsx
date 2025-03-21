import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Create = () => {
  const [createTitle, setCreateTitle] = useState<string>("");
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
    >
      <Link href="groupSelector">
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#EDEDED",
            gap: 5,
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: "white",
              backgroundColor: "black",
              paddingVertical: 1,
              paddingHorizontal: 5,
              borderRadius: 10,
              fontWeight: "bold",
            }}
          >
            r/
          </Text>
          <Text style={{ fontWeight: "600" }}>Select a community</Text>
          <AntDesign name="down" size={15} color="black" />
        </View>
      </Link>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TextInput
          placeholder="Title"
          onChangeText={(text) => setCreateTitle(text)}
          value={createTitle}
        />
        <Button title="Submit" onPress={() => console.error("Pressed")} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
