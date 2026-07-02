import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { auth } from "../../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
// import NavBar from "../NavBar";
import { useLocalSearchParams } from "expo-router";

//Home Featureset
//
export default function THINGY4() {
  const router = useRouter();
  const [light_dark, setld] = useState(false);
  const [name, setName] = useState("");
  let bop = "";
  const { reference } = useLocalSearchParams();

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
          console.log(thingy);
          const header_page = {
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
            Referer: "https://www.tabroom.com/index/index.mhtml",

            Priority: "u=0, i",
            Connection: "keep-alive",
          };

          const request_page = await fetch(
            "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=" +
              reference,
            { method: "GET", headers: header_page, redirect: "follow" },
          );
          const pop_page = await request_page.text();
          const hi_page = pop_page.split("\n");
          console.log(hi_page);
        } catch (e) {
          router.replace("/");
        }
      } else {
      }
    });
  }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: light_dark ? "#000000" : "#ffffff" }}
    >
      <Text style={styles.nombre}>{reference}</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        <TouchableOpacity style={styles.topbuttons}>
          <Text>Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbuttons}>
          <Text>Entries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbuttons}>
          <Text>Judges</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbuttons}>
          <Text>Pairings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbuttons}>
          <Text>Results</Text>
        </TouchableOpacity>
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
  topbuttons: {
    backgroundColor: "lightgray",
    height: 40,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
