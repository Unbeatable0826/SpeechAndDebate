import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    BackHandler,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
// import NavBar from "../NavBar";
//Home Featureset
//
export default function THING322() {
  const { result } = useLocalSearchParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [light_dark, setld] = useState(false);
  const [rounds_res, setroundres] = useState([]);
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
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
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
        Referer: "https://www.tabroom.com/user/student/index.mhtml?err=&msg=",
        Priority: "u=0, i",
      };
      const request = await fetch(
        "https://tabroom.com/user/student/" + result.replaceAll(">", ""),
        { method: "GET", headers: header, redirect: "follow" },
      );
      const response = await request.text();
      const hi = response.split("\n");
      let current = [];
      let resulty = [];
      for (let i = 0; i < hi.length; i++) {
        let ploop = [];

        if (hi[i].includes('<tr class="smallish semibold yellowrow">')) {
          for (let j = i; j < hi.length; j++) {
            if (hi[j].includes("/tr>")) {
              break;
            }
            if (hi[j].includes("<th")) {
              current.push(hi[j + 1].trim().replaceAll("&amp;", "&"));
            }
          }
        }
        if (hi[i].includes('<tr class="row">')) {
          let counter = 0;

          for (let j = i; j < hi.length; j++) {
            let information = "";

            if (hi[j].includes("/tr>")) {
              // DEAL WITH JUDGE FEEDBACK
              break;
            }
            if (hi[j].includes("<td")) {
              for (let k = j; k < hi.length; k++) {
                if (hi[k].includes("/td>")) {
                  break;
                }
                if (
                  !hi[k].includes(">") &&
                  !hi[k].includes("<") &&
                  hi[k].trim() !== "" &&
                  !hi[k].replaceAll(" ", "").includes("class=") &&
                  !hi[k].includes("href") &&
                  !hi[k].includes("data-text") &&
                  !hi[k].includes("=")
                ) {
                  information += hi[k].trim() + " ";
                }
              }

              ploop.push(current[counter] + " : " + information);
              counter++;
            }
          }
          resulty.push(ploop);
          ploop = [];
        }
      }
      console.log(current);
      setroundres(resulty);
    };
    hello();
  }, []);

  useEffect(() => {
    const goback = () => {
      if (router.canGoBack()) {
        router.back();
      } else {
        BackHandler.exitApp();
      }
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
        // alert(user.uid);
        //LOGGED OUT PREVENTION
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
        } catch (e) {
          router.replace("/");
        }
      } else {
        router.replace("/");
      }
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Results",
          headerStyle: {
            backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
          },
          headerTintColor: light_dark ? "#ffffff" : "black",
        }}
      />
      <ScrollView>
        {rounds_res.map((item) => {
          return (
            <TouchableOpacity
              style={[
                styles.tourneyButton,
                {
                  backgroundColor: light_dark ? "rgb(0, 0, 0)" : "lightgray",
                  borderColor: light_dark ? "white" : "black",
                  borderWidth: 0,
                  shadowColor: light_dark ? "white" : "black",
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 3,
                },
              ]}
            >
              {item.map((item2) => {
                return (
                  <Text style={{ color: light_dark ? "white" : "black" }}>
                    {item2}
                  </Text>
                );
              })}
            </TouchableOpacity>
          );
        })}
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nombre: {
    fontSize: 50,
    marginTop: 10,
    fontFamily: "Petemoss",
  },
  tourneyButton: {
    backgroundColor: "lightgray",
    padding: 10,
    margin: 15,
    borderRadius: 15,
  },
});
