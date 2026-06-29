import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
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
  const styles = StyleSheet.create({
    nombre: {
      fontSize: 50,
      marginTop: 10,
      fontFamily: "Petemoss",
    },
  });
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
              let type2 = "";
              if (type.includes("span")) {
                type2 = "Unknown";
              } else {
                type2 = type;
              }
              let type3 = "";
              for (let j = i + 1; j < temp.length; j++) {
                if (temp[j].includes("padleft full padrightless")) {
                  break;
                } else if (temp[j].includes("greentext semibold fifth")) {
                  console.log(
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
                      .replaceAll('"', ""),
                  );
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
              });
            }
          }
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
      <NavBar />
    </View>
  );
}
