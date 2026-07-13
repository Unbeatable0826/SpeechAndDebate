import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { auth } from "../../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
// import NavBar from "../NavBar";
//Home Featureset
//

export default function THINGY4() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [light_dark, setld] = useState(false);
  const { message } = useLocalSearchParams();
  const [objmessage, setobjmessage] = useState("");
  let bop = "";

  useEffect(() => {
    const workpls = async () => {
      const temp = await AsyncStorage.getItem("theme");
      const temp_2 = !(temp == "light");
      setld(temp_2);
    };
    workpls();
  }, []);

  useEffect(() => {
    const goback = () => {
      router.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goback,
    );
  }, []);

  useEffect(() => {
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      let headers = {
        Host: "masonapi.tabroom.com",
        Cookie: thingy,
        "Sec-Ch-Ua-Platform": "Windows",
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "*/*",
        "Sec-Ch-Ua": '"Not-A.Brand";v="24", "Chromium";v="146"',
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        "Sec-Ch-Ua-Mobile": "?0",
        Origin: "https://www.tabroom.com",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://www.tabroom.com/",
        Priority: "u=1, i",
      };
      const request = await fetch(
        "https://masonapi.tabroom.com/v1/user/inbox/list",
        { method: "GET", headers: headers, redirect: "follow" },
      );
      const response = await request.json();
      let number = 0;
      for (let i = 0; i < response.length; i++) {
        if (String(response[i].id) === message) {
          setobjmessage(response[i]);
          number = i;
          break;
        }
      }
      let gop = new URLSearchParams();
      gop.append("messageId", response[number].id);
      let head = {
        Host: "masonapi.tabroom.com",
        Cookie: thingy,
        "Content-Length": "18",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "*/*",
        "Sec-Ch-Ua": '"Not-A.Brand";v="24", "Chromium";v="146"',
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        Origin: "https://www.tabroom.com",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: "https://www.tabroom.com/",
        Priority: "u=1, i",
      };
      const request2 = await fetch(
        "https://masonapi.tabroom.com/v1/user/inbox/markRead",
        {
          method: "POST",
          headers: head,
          body: gop,
        },
      );
    };
    hello();
  }, []);

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
          const hi = pop.split("\n");
          console.log(thingy);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: light_dark ? "black" : "white" }}>
      <Stack.Screen
        options={{
          title: objmessage ? objmessage.subject : "",
          headerStyle: {
            backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
          },
          headerTintColor: light_dark ? "#ffffff" : "black",
        }}
      />
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: light_dark ? "#ffffff" : "black",
            borderRadius: 10,
            padding: 10,
            marginLeft: 20,
            width: "90%",

            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            color: light_dark ? "#ffffff" : "black",
          }}
        >
          Subject: {objmessage ? objmessage.subject : ""}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: light_dark ? "#ffffff" : "black",
            borderRadius: 10,
            padding: 10,
            marginLeft: 20,
            width: "90%",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            color: light_dark ? "#ffffff" : "black",
          }}
        >
          Sent At:{" "}
          {objmessage
            ? new Date(objmessage.createdAt).toLocaleString("en-US")
            : ""}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: light_dark ? "#ffffff" : "black",
            borderRadius: 10,
            padding: 10,
            marginLeft: 20,
            width: "90%",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            color: light_dark ? "#ffffff" : "black",
          }}
        >
          Tournament: {objmessage ? objmessage.tournName : ""}
        </Text>
      </TouchableOpacity>

      <AutoHeightWebView
        style={{
          width: "80%",
          marginLeft: 20,
        }}
        source={{
          html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                margin: 0;
                padding: 0;
                color: ${light_dark ? "white" : "black"};

              }
            </style>
          </head>
          <body>
            ${objmessage.body}
            </body>
        </html>
        `,
        }}
      />

      {/* <Text style={{ color: light_dark ? "#ffffff" : "black" }}>
        {objmessage ? objmessage.body : ""}
      </Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  nombre: {
    fontSize: 50,
    marginTop: 10,
    fontFamily: "Petemoss",
  },
});
