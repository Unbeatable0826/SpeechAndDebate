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

import EvilIcons from "@expo/vector-icons/EvilIcons";

import AutoheightWebView from "react-native-autoheight-webview"; //still no render?
import { auth } from "../../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
// import NavBar from "../NavBar";
//Home Featureset
//
export default function THING322() {
  const { result, name } = useLocalSearchParams();
  const router = useRouter();
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
      for (let i = 0; i < hi.length - 4; i++) {
        // -4 for the sake of the other for loop working cuz well FUN AND WEIRD CRAP
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
                  !hi[k].includes("=") &&
                  !hi[k].includes('"') &&
                  information.includes(hi[k].trim()) == false
                ) {
                  information += hi[k].trim() + " ";
                }
              }

              ploop.push(current[counter] + " : " + information);
              counter++;
            }
          }

          ploop.push("collapse");
          resulty.push(ploop);
          ploop = [];
        } else if (
          hi[i].includes("<tr") &&
          hi[i + 1].includes("hidden") &&
          hi[i + 2].includes("feedback") &&
          hi[i + 3].includes("id")
        ) {
          console.log("WORKS"); // IG
          let curren = "";
          for (let j = i + 5; j < hi.length; j++) {
            if (hi[j].includes("/tr>")) {
              break;
            }
            if (light_dark) {
              curren += hi[j].trim();
              // .replaceAll(/<h([1-6])/g, '<h$1 style="color: white;"') // REGEX IS EXTREMELY HELPFULLLLLLLLLLLL, EVERYWHERE
              // .replaceAll("<p", '<p style="color: white;"') + " ";
            } else {
              curren += hi[j].trim() + " ";
            }
          }
          resulty[resulty.length - 1][resulty[resulty.length - 1].length - 1] =
            curren;
          resulty[resulty.length - 1].push("collapse");
        }
      }
      console.log(resulty);
      await setroundres(resulty);
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
      <TouchableOpacity
        onPress={() => {
          const hop = result.split("&");
          const rek = hop[0]
            .replace("history.mhtml?", "")
            .replaceAll("tourn_id=", "");
          router.push({
            pathname: "/Tourneys/current/curry",
            params: {
              reference: rek,
              tournname: name,
            },
          });
        }}
        style={{ marginTop: 5, alignSelf: "flex-end", marginRight: 20 }}
      >
        <EvilIcons name="trophy" size={40} color="blue" />
      </TouchableOpacity>

      <ScrollView>
        {rounds_res.map((item) => {
          return (
            <TouchableOpacity
              key={item[0]}
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
              onPress={async () => {
                let thing = await [...rounds_res]; // APPARENTLY THIS ONLY GENERATES A FREEKING SHALLOW COPY WHICH IS SCREWING EVERYTHING UP.. UGHHH
                for (let i = 0; i < thing.length; i++) {
                  if (thing[i][0] == item[0]) {
                    if (item[item.length - 1] == "collapse") {
                      thing[i][thing[i].length - 1] = "expand";
                    } else {
                      thing[i][thing[i].length - 1] = "collapse";
                    }
                    break;
                  }
                }
                setroundres(thing);

                console.log(thing);
              }}
            >
              {item.map((item2) => {
                if (
                  item2 != "expand" &&
                  item2 != "collapse" &&
                  !item2.includes("</td>")
                ) {
                  return (
                    <Text
                      style={{
                        color:
                          item[item.length - 2].includes("</div>") &&
                          item2 == item[0]
                            ? "green"
                            : light_dark
                              ? "white"
                              : "black",
                      }}
                    >
                      {item2}
                    </Text>
                  );
                } else if (
                  item2.includes("</div>") &&
                  item[item.length - 1] == "expand"
                ) {
                  return (
                    <View
                      style={{
                        display:
                          item[item.length - 1] == "collapse" ? "none" : "flex",
                      }}
                    >
                      <AutoheightWebView
                        key={"FJDKFJ"}
                        style={{
                          width: "100%",
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
                                ${item2.replaceAll('<span style="color: #0a0a0a;', '<span style="color: ' + (light_dark ? "white" : "black") + ";")}
                                </body>
                            </html>
                            `,
                        }}
                        scalesPageToFit={true}
                        viewportContent={"width=device-width, user-scalable=no"}
                      />
                    </View>
                  );
                }
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
