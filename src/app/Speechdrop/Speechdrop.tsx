import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { auth } from "../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
import { Text } from "react-native";
import NavBar from "../NavBar";
//Home Featureset
//
export default function THINGY5() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [light_dark, setld] = useState(false);
  const [result_one, setresultone] = useState([]);

  let bop = "";
  useEffect(() => {
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      let headers = {
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
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        Priority: "u=0, i",
      };
      const request = await fetch(
        "https://www.tabroom.com/user/student/index.mhtml?err=&msg=",
        { method: "GET", headers: headers, redirect: "follow" },
      );
      const response = await request.text();
      const hi = response.split("\n");
      let current = [];
      let resulty = [];
      for (let i = 0; i < hi.length; i++) {
        if (hi[i].includes('<tr class="yellowrow">')) {
          for (let j = i; j < hi.length; j++) {
            if (hi[j].includes("</tr>")) {
              break;
            }
            if (hi[j].includes("<th")) {
              current.push(hi[j + 1].trim());
            }
          }
        }
        if (hi[i].includes('<tr class="smallish">')) {
          let counter = 0;
          let one = [];
          for (let j = i; j < hi.length; j++) {
            if (hi[j].includes("</tr>")) break;
            if (hi[j].includes("<td")) {
              for (let k = j; k < hi.length; k++) {
                if (hi[k].includes("</td>")) {
                  break;
                }
                if (
                  hi[k].includes("href=") &&
                  hi[k].includes("history.mhtml?")
                ) {
                  one.push(
                    hi[k]
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', ""),
                  );
                } else if (
                  !hi[k].trim().includes("title") &&
                  !hi[k].includes("data-text") &&
                  !hi[k].includes(">") &&
                  !hi[k].includes("<") &&
                  !hi[k].includes("class") &&
                  !hi[k].includes('"') &&
                  hi[k].trim() != ""
                ) {
                  one.push(current[counter] + " : " + hi[k].trim());
                }
              }
              counter++;
            }
          }
          one.push("show");
          resulty.push(one);
        }
      }
      // console.log(current);
      setresultone(resulty);
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
          const pop = await request.text();
          if (!pop.includes('<span class="threefifths padright">')) {
            router.replace("/");
          }
          // console.log(hi);
          let Last_name = "";
          let run = 0;
        } catch (e) {
          router.replace("/");
        }
      } else {
      }
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: light_dark ? "rgb(77, 76, 76)" : "white",
      }}
    >
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
        {result_one.map((item) => {
          return (
            <TouchableOpacity
              style={[
                styles.tourneyButton,
                {
                  display: item[item.length - 1] == "show" ? "flex" : "none",
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
                if (item2 != "show") {
                  return (
                    <Text style={{ color: light_dark ? "white" : "black" }}>
                      {item2}
                    </Text>
                  );
                }
              })}
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
  tourneyButton: {
    backgroundColor: "lightgray",
    padding: 10,
    margin: 15,
    borderRadius: 15,
  },
});
