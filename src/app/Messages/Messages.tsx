import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
import NavBar from "../NavBar";
//Home Featureset
//
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function THINGY4() {
  const [light_dark, setld] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [messages, setmessages] = useState([]);
  let bop = "";
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
      for (let i = 0; i < response.length; i++) {
        response[i] = { ...response[i], show: true };
      }
      setmessages(response);
    };
    hello();
  }, []);

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
        } catch (e) {
          router.replace("/");
        }
      } else {
      }
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: light_dark ? "black" : "white" }}>
      {/* <Text style={styles.nombre}>MESSAGES</Text> */}
      <Stack.Screen
        options={{
          title: "Messages",
          headerStyle: {
            backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
          },
          headerTintColor: light_dark ? "#ffffff" : "black",
        }}
      />
      <ScrollView>
        <Text></Text>
        <TextInput
          style={{
            marginLeft: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: light_dark ? "white" : "black",
            padding: 10,
            color: light_dark ? "white" : "black",
            width: "90%",
          }}
          placeholderTextColor={light_dark ? "white" : "black"}
          placeholder="Search Results"
          onChangeText={(text) => {
            let propy = [...messages];
            for (let i = 0; i < propy.length; i++) {
              propy[i] = {
                ...propy[i],
                show:
                  text == "" ||
                  (propy[i].subject ?? "")
                    .toLowerCase()
                    .includes(text.toLowerCase()) ||
                  (propy[i].tournName ?? "")
                    .toLowerCase()
                    .includes(text.toLowerCase()) ||
                  (propy[i].body ?? "")
                    .toLowerCase()
                    .includes(text.toLowerCase())
                    ? true
                    : false,
              };
            }
            setmessages(propy);
          }}
        ></TextInput>
        {messages.map((item) => {
          return (
            <TouchableOpacity
              style={[
                styles.work,
                {
                  display: item.show ? "flex" : "none",
                  backgroundColor: light_dark ? "rgb(0, 0, 0)" : "white",
                  borderColor: light_dark ? "#404142" : "#586069",
                  shadowColor: light_dark ? "white" : "black",
                },
              ]}
              onPress={() => {
                console.log(item.id);
                // console.log(item);
                router.push({
                  pathname: "/Messages/CurrentM/curr",
                  params: {
                    message: String(item.id),
                  },
                });
              }}
            >
              <Feather
                name="mail"
                size={24}
                color={
                  item.read_at == null ? "blue" : light_dark ? "white" : "black"
                }
              />
              <Entypo
                name="dot-single"
                size={24}
                style={{
                  marginTop: -3,
                  display: item.read_at == null ? "flex" : "none",
                }}
                color={
                  !item.read_at !== null
                    ? "blue"
                    : light_dark
                      ? "white"
                      : "black"
                }
              />
              <Text style={{ color: light_dark ? "white" : "black" }}>
                Subject: {item.subject}
              </Text>
              <Text style={{ color: light_dark ? "white" : "black" }}>
                Tournament: {item.tournName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <NavBar />
    </View>
  );
}
const styles = StyleSheet.create({
  nombre: {
    fontSize: 50,
    marginTop: 10,
    fontFamily: "Petemoss",
  },
  work: {
    marginTop: 10,
    fontSize: 17,
    padding: 6,
    width: 340,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
});
