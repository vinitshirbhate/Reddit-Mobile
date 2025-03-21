import { Redirect, Stack, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/signIn"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="groupSelector" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          headerTitle: "Post",
          headerStyle: { backgroundColor: "#FF5700" },
          headerLeft: () => {
            return (
              <AntDesign
                name="close"
                size={24}
                color="white"
                onPress={() => router.back()}
              />
            );
          },
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
