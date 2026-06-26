import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native"; this is now an old one
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Switch, Text, View } from "react-native";
import { auth } from "../../../../firebaseConfig.js";
// Current preferences --> store in firebase database so no renewal and major problems during re-login
// DARK AND LIGHT
// Message Updates
// Notifications for feedback
// Timer alarm, On or off
export default function THINGY6() {
  const router = useRouter();
  const [light_dark, setld] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const thingy = await SecureStore.getItemAsync("cookie");
        try {
          let header = {
            Host: "www.tabroom.com",
            Cookie: thingy,
            "Sec-Ch-Ua": '"Not-A.Brand";v="24", "Chromium";v="146"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Accept-Language": "en-US,en;q=0.9",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            Referer:
              "https://www.tabroom.com/user/student/index.mhtml?err=&msg=",
            Priority: "u=0, i",
          };
          const request = await fetch(
            "https://www.tabroom.com/user/login/profile.mhtml",
            { method: "GET", headers: header, redirect: "follow" },
          );
          const pop = await request.text();
          if (!pop.includes('<span class="threefifths padright">')) {
            router.replace("/");
          }
        } catch (e) {
          router.replace("/");
        }
      } else {
        alert(
          "UMM SOMETHING HORRIBLE HAS HAPPENED< ANDDD IT NO GOOD. RESTART APP.",
        );
      }
    });
  }, []);
  const lightd = async () => {
    setld(!light_dark);
  };
  return (
    <View style={styles.container}>
      <View style={styles.light_d_1}>
        <Text style={styles.theme}> Theme </Text>
        <Fontisto
          name="day-sunny"
          size={24}
          color="black"
          style={{ marginLeft: 170 }}
        />
        <Switch
          onValueChange={lightd}
          value={light_dark}
          trackColor={{ false: "#767577", true: "#b9bbbe" }}
          thumbColor={!light_dark ? "#ffffff" : "#292729"}
          ios_backgroundColor="#3e3e3e"
          style={styles.light_d}
        />
        <MaterialIcons
          name="nights-stay"
          size={24}
          color="black"
          style={{ marginLeft: 10 }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  light_d: {
    marginLeft: 10,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
  light_d_1: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  theme: {
    fontSize: 20,
  },
});
