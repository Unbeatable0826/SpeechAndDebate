import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native"; this is now an old one
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { doc, updateDoc } from "firebase/firestore"; //SO THIS STUPID AHH AI PRETIFIER OR SOME GARBAGE KEEPS REMOVING MY IMPorts and idk how to stop it :(((((((((((((((((((((((())))))))))))))))))))))))
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../../firebaseConfig.js";
// import Ionicons from '@expo/vector-icons/Ionicons';
// Current preferences --> store in firebase database so no renewal and major problems during re-login
// DARK AND LIGHT
// Message Updates
// Notifications for feedbackF
// Timer alarm, On or off
export default function THINGY6() {
  const router = useRouter();
  const [timer, settimer] = useState(true);
  const [light_dark, setld] = useState(false);
  const [messages, setm] = useState(true);
  const [results, setr] = useState(true);
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
    console.log("INSTANT RUN");
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      Skin: light_dark ? "light" : "dark",
    });
    await AsyncStorage.setItem("theme", !light_dark ? "dark" : "light");
    await setld(!light_dark);
  };
  const message_update = async () => {
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      Message_Updates: messages ? "off" : "on",
    });
    await AsyncStorage.setItem("messages", !messages ? "on" : "off");
    setm(!messages);
  };
  const changeresults = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      Result_Updates: results ? "off" : "on",
    });
    await AsyncStorage.setItem("results", !results ? "on" : "off");
    setr(!results);
  };
  const timerchange = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      Timer_Alarm: timer ? "off" : "on",
    });
    await AsyncStorage.setItem("timer", !timer ? "on" : "off");
    settimer(!timer);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: !light_dark ? "white" : "black" },
      ]}
    >
      <Stack.Screen
        options={{
          title: "Preferences",
          headerStyle: {
            backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
          },
          headerTintColor: light_dark ? "#ffffff" : "black",
        }}
      />
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
          onValueChange={lightd}
        />

        <MaterialIcons
          name="nights-stay"
          size={24}
          color="black"
          style={{ marginLeft: 10, color: light_dark ? "white" : "black" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.mupdates,
          { borderColor: !light_dark ? "black" : "white" },
        ]}
        onPress={message_update}
      >
        <Text
          style={[styles.under, { color: !light_dark ? "black" : "white" }]}
        >
          Message Notifications
        </Text>
        <MaterialCommunityIcons
          name="message-alert"
          size={24}
          color={light_dark ? "white" : "black"}
          style={{ marginLeft: 60 }}
        />
        <Switch
          value={messages}
          trackColor={{ false: "#767577", true: "#b9bbbe" }}
          thumbColor={!messages ? "#ffffff" : "#292729"}
          ios_backgroundColor="#3e3e3e"
          style={styles.mupdates_2}
          onValueChange={message_update}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.rupdates,
          { borderColor: !light_dark ? "black" : "white" },
        ]}
        onPress={changeresults}
      >
        <Text
          style={[styles.randf, { color: !light_dark ? "black" : "white" }]}
        >
          Tourney Result & Feedback
        </Text>
        <Ionicons
          name="notifications"
          size={24}
          color={light_dark ? "white" : "black"}
          style={{ marginLeft: 20 }}
        />
        <Switch
          value={results}
          trackColor={{ false: "#767577", true: "#b9bbbe" }}
          thumbColor={!results ? "#ffffff" : "#292729"}
          ios_backgroundColor="#3e3e3e"
          style={styles.rupdates_2}
          onValueChange={changeresults}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timer_alarm,
          {
            borderColor: !light_dark ? "black" : "white",
          },
        ]}
        onPress={timerchange}
      >
        <Text
          style={{
            marginLeft: 10,
            color: !light_dark ? "black" : "white",
            fontSize: 20,
          }}
        >
          Timer alarm
        </Text>
        <Ionicons
          name="timer"
          size={24}
          color={light_dark ? "white" : "black"}
          style={{ marginLeft: 160 }}
        />
        <Switch
          value={timer}
          trackColor={{ false: "#767577", true: "#b9bbbe" }}
          thumbColor={!timer ? "#ffffff" : "#292729"}
          ios_backgroundColor="#3e3e3e"
          style={styles.rupdates_2}
          onValueChange={timerchange}
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
  under: {
    fontSize: 20,
    marginLeft: 10,
  },
  randf: {
    fontSize: 20,
    marginLeft: 10,
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
  mupdates: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  theme: {
    fontSize: 20,
  },
  mupdates_2: {
    marginLeft: 5,
    marginRight: 10,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
  rupdates: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  rupdates_2: {
    marginLeft: 5,
    marginRight: 10,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
  timer_alarm: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
