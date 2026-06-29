import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
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

import { auth } from "../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
import NavBar from "../NavBar";
//Home Featureset
//
export default function THINGY2() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tourneys, setTourneys] = useState([]);
  let bop = "";

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
          if (!pop.includes('<span class="threefifths padright">')) {
            router.replace("/");
          }
          // Tourmnament request sending thing
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
                } else if (
                  temp[j].includes("redtext full centeralign semibold")
                ) {
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
                  .trim(),
                city: temp[i + 10].trim(),
                state: temp[i + 19].trim(),
                tipe: type2,
                registration: type3,
              });
            }
          }
          setTourneys(temp_tourney);
        } catch (e) {
          router.replace("/");
        }
      } else {
        console.log("WROMG");
      }
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {tourneys.map((thingy) => {
          let registration_color = "green";
          if (
            thingy.registration.includes("Closed") ||
            thingy.registration.includes("No open registration")
          ) {
            registration_color = "red";
          }
          return (
            <TouchableOpacity
              style={styles.tourneyButton}
              key={thingy.reference}
            >
              <View>
                <Text style={{ color: "blue" }}>Date: {thingy.date}</Text>
                <Text>Name: {thingy.name}</Text>
                <Text>City: {thingy.city}</Text>
                <Text>State: {thingy.state}</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text>Type:</Text>
                  <MaterialIcons
                    display={
                      thingy.tipe == "O" || thingy.tipe == "PO"
                        ? "flex"
                        : "none"
                    }
                    name="computer"
                    size={24}
                    color="blue"
                  />
                  <FontAwesome6
                    name="person-circle-question"
                    size={24}
                    display={thingy.tipe == "Unknown" ? "flex" : "none"}
                    color="black"
                  />
                  <FontAwesome6
                    name="person"
                    size={24}
                    display={
                      thingy.tipe == "P" || thingy.tipe == "PO"
                        ? "flex"
                        : "none"
                    }
                    color="black"
                  />
                </View>
                <Text style={{ color: registration_color }}>
                  Registration: {thingy.registration}
                </Text>
              </View>
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
