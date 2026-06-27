import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native"; this is now an old one
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, updateDoc } from "firebase/firestore"; //SO THIS STUPID AHH AI PRETIFIER OR SOME GARBAGE KEEPS REMOVING MY IMPorts and idk how to stop it :(((((((((((((((((((((((())))))))))))))))))))))))
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../../firebaseConfig.js";

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
  useEffect(() => {
    const light_or_dark = async () => {
      console.log(AsyncStorage.getItem("theme"));
      const temp = await AsyncStorage.getItem("theme");
      const temp_2 = temp == "light" ? false : true;
      setld(temp_2);
    };
    light_or_dark();
  }, []);

  const lightd = async () => {
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      Skin: light_dark ? "light" : "dark",
    });
    await AsyncStorage.setItem("theme", light_dark ? "dark" : "light");
    setld(!light_dark);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: !light_dark ? "white" : "black" },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.light_d_1,
          { borderColor: !light_dark ? "black" : "white" },
        ]}
        onPress={lightd}
      >
        <Text
          style={[styles.theme, { color: !light_dark ? "black" : "white" }]}
        >
          {" "}
          Theme{" "}
        </Text>
        <Fontisto
          name="day-sunny"
          size={24}
          color="black"
          style={{
            marginLeft: 170,
            color: light_dark ? "white" : "black",
          }}
        />
        <Switch
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
          style={{ marginLeft: 10, color: light_dark ? "white" : "black" }}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    color: "black",
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
    borderWidth: 1,
    borderRadius: 10,
  },
  theme: {
    fontSize: 20,
  },
});
