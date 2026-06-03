import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
    const [loaded] = useFonts({
    Petemoss: require("../../assets/fonts/thing.ttf"), 
  });
  if (!loaded) {return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );}
  return <Stack />;
}
