import { Stack, useRouter } from "expo-router";
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
import { auth } from "../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
import NavBar from "../NavBar";
//Home Featureset

//FEATURES TO ADD --> Notification ability, if selected; PAIRINGS OUT EMAILS; EMAIL UPDATES; CONSTANT REFRESH

export default function THINGY2() {
  const [light_dark, setld] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [tourneys, setTourneys] = useState([]);

  let bop = "";
  useEffect(() => {
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      let tourney_header = {
        Host: "www.tabroom.com",
        Cookie: thingy,
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
        "Sec-Ch-Ua": '"Not-A.Brand";v="24", "Chromium";v="146"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        Priority: "u=0, i",
      };
      const touney_request = await fetch(
        "https://www.tabroom.com/index/index.mhtml",
        { method: "GET", headers: tourney_header, redirect: "follow" },
      );
      let filter_ran = 0;
      const tourney_result = await touney_request.text();
      const temp = tourney_result.split("\n");
      let temp_tourney = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].includes("padleft full padrightless")) {
          const type = temp[i + 25].trim();
          let type2 = "Unknown";
          let t1 = false;
          let t2 = false;
          for (let k = i + 1; k < temp.length; k++) {
            if (temp[k].includes("padleft full padrightless")) {
              break;
            }
            if (temp[k].includes("Tournament has online events")) {
              t2 = true;
            }
            if (temp[k].includes("Tournament has in-person events")) {
              t1 = true;
            }
          }

          if (t1 && t2) {
            type2 = "PO";
          } else if (t1) {
            type2 = "P";
          } else if (t2) {
            type2 = "O";
          }

          let type3 = "";
          for (let j = i + 1; j < temp.length; j++) {
            if (temp[j].includes("padleft full padrightless")) {
              break;
            } else if (temp[j].includes("greentext semibold fifth")) {
              type3 +=
                " " +
                temp[j]
                  .trim()
                  .replace("greentext semibold fifth", "")
                  .trim()
                  .replaceAll("span", "")
                  .replaceAll("/", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");

              type3 +=
                " " +
                temp[j + 1]
                  .trim()
                  .replace("quarter centeralign", "")
                  .trim()
                  .replaceAll("/span", "")
                  .replaceAll("span", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");

              type3 +=
                " " +
                temp[j + 2]
                  .trim()
                  .replace("half grow nowrap padrightless", "")
                  .trim()
                  .replaceAll("span", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll("/", "")
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");
            } else if (temp[j].includes("redtext full centeralign semibold")) {
              type3 =
                "" +
                temp[j]
                  .trim()
                  .replace("redtext full centeralign semibold", "")
                  .trim()
                  .replaceAll("span", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll("/", "")
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");
            } else if (temp[j].includes("orangetext semibold fifth")) {
              type3 +=
                "" +
                temp[j]
                  .trim()
                  .replace("orangetext semibold fifth", "")
                  .trim()
                  .replaceAll("span", "")
                  .replaceAll("/", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");
              type3 +=
                " " +
                temp[j + 1]
                  .trim()
                  .replace("quarter centeralign", "")
                  .trim()
                  .replaceAll("/span", "")
                  .replaceAll("span", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");
              type3 +=
                " " +
                temp[j + 2]
                  .trim()
                  .replace("half", "")
                  .trim()
                  .replaceAll("span", "")
                  .trim()
                  .replaceAll("class=", "")
                  .trim()
                  .replaceAll("/", "")
                  .replaceAll(">", "")
                  .trim()
                  .replaceAll("<", "")
                  .trim()
                  .replaceAll('"', "");
            }
          }

          temp_tourney.push({
            date: temp[i - 11].trim(),
            name: temp[i + 1].trim(),
            reference: temp[i - 2]
              .trim()
              .replace('href"', "")
              .replace('"/index/tourn/index.mhtml?tourn_id=', "")
              .replace('"', " ")
              .replace("=", "")
              .trim()
              .replaceAll("href", ""),
            city: temp[i + 10].trim(),
            state: temp[i + 19].trim(),
            show: "show",
            tipe: type2,
            normal: true,
            registration: type3,
          });
          if (temp_tourney.length > 2) {
            break;
          }
        }
      }
      setTourneys(temp_tourney);
      console.log(temp_tourney);
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
    const working = async () => {
      const temp = await SecureStore.getItemAsync("theme");
      const temp_2 = temp == "light" ? false : true;
      setld(temp_2);
    };
    working();
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
          const hi = pop.split("\n");
          // console.log(hi);
          let Last_name = "";
          let run = 0;
          // hi.forEach(item => {
          //     if (item.includes("<span class=\"threefifths padright\">") && run === 4){

          //         run++;
          //     }else if(item.includes("<span class=\"threefifths padright\">")){
          //         run++;
          //     }
          // })
          for (let i = 0; i < hi.length; i++) {
            if (
              hi[i].includes('<span class="threefifths padright">') &&
              run == 3
            ) {
              let lst = hi[i + 4].trim();
              Last_name = lst.slice(9, lst.length - 1);
              bop = "  Welcome back, Mr. " + Last_name + " !";
              setTimeout(() => {
                var index = 0;
                const doe = () => {
                  index++;
                  setName(bop.slice(0, index));
                  if (index < bop.length) {
                    setTimeout(doe, 50);
                  }
                };

                const pl1 = setTimeout(doe, 250);
                return () => {
                  clearTimeout(pl1);
                };
              }, 1500);

              console.log(Last_name);
              break;
            } else if (hi[i].includes('<span class="threefifths padright">')) {
              run++;
            }
          }
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
          title: "Home",
          headerStyle: {
            backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
          },
          headerTintColor: light_dark ? "#ffffff" : "black",
        }}
      />
      <Text
        style={[
          styles.nombre,
          {
            color: light_dark ? "white" : "black",
          },
        ]}
      >
        {name}
      </Text>
      <View
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
        ></TouchableOpacity>
      </View>

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
