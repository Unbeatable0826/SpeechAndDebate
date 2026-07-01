import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from "react-native-element-dropdown";
import NavBar from "../NavBar";

//Home Featureset
//
export default function THINGY2() {
  const [circuit, setCircuit] = useState("");
  const [circuit_data, setCircuitData] = useState([
    { label: "Upcoming", value: "" },
  ]);
  const [hardsearch, sethardsearch] = useState("");
  const [year, setYear] = useState("0");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();
  const [ontop, setontop] = useState(false);
  // const [name, setName] = useState("");
  const [tourneys, setTourneys] = useState([]);
  const [yr, setyrdata] = useState([{ value: "", label: "Upcoming" }]);
  const [counter, setcounter] = useState([{ value: "", label: "Upcoming" }]);
  const [statep, setdatas] = useState([{ value: "", label: "Upcoming" }]);
  const [light_dark, setld] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
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
                show: "show",
                tipe: type2,
                registration: type3,
              });
            } else if (
              temp[i].includes("this.form.submit()") &&
              filter_ran == 0
            ) {
              let temp_circuit = [{ value: "", label: "Upcoming" }];
              // console.log(temp[i + 9]); // HAS 4
              for (let j = i + 8; j < temp.length; j++) {
                if (temp[j].includes("option") && temp[j].includes("=")) {
                  const temp1 = temp[j]
                    .trim()
                    .replace("option", "")
                    .trim()
                    .replaceAll(">", "")
                    .trim()
                    .replaceAll("<", "")
                    .trim()
                    .replaceAll('"', "")
                    .trim()
                    .replace("value", "")
                    .trim()
                    .replace("=", "")
                    .trim();
                  const temp2 = temp[j + 2].replace(">", "").trim();
                  temp_circuit.push({ value: temp1, label: temp2 });
                } else if (temp[j].includes("this.form.submit()")) {
                  break;
                }
              }
              setCircuitData(temp_circuit);
              filter_ran += 1;
            } else if (
              temp[i].includes("this.form.submit()") &&
              filter_ran == 1
            ) {
              let temp_year = [{ value: "0", label: "Upcoming" }];
              for (let f = i + 6; f < temp.length; f++) {
                if (temp[f].includes("this.form.submit()")) {
                  break;
                }
                if (temp[f].includes("option") && temp[f].includes("=")) {
                  const temp23 = temp[f]
                    .trim()
                    .replace("option", "")
                    .trim()
                    .replaceAll(">", "")
                    .trim()
                    .replaceAll("<", "")
                    .trim()
                    .replaceAll('"', "")
                    .trim()
                    .replace("value", "")
                    .trim()
                    .replace("=", "")
                    .trim();
                  temp_year.push({ value: temp23, label: temp23 });
                }
              }
              setyrdata(temp_year);
              filter_ran += 1;
            } else if (
              temp[i].includes("this.form.submit()") &&
              filter_ran == 2
            ) {
              let temp3 = [{ value: "", label: "Upcoming" }];
              for (let g = i + 6; g < temp.length; g++) {
                if (temp[g].includes("this.form.submit()")) {
                  break;
                }
                // console.log(temp[g]);
                if (temp[g].includes("value") && temp[g].includes("=")) {
                  const temp9 = temp[g]
                    .trim()
                    .replace("value", "")
                    .replace("=", "")
                    .trim()
                    .replaceAll('"', "")
                    .trim();
                  const temp10 = temp[g + 2].trim().replace(">", "").trim();
                  // const temp9 = temp[g]
                  //   .trim()
                  //   .replace("option", "")
                  //   .trim()
                  //   .replaceAll(">", "")
                  //   .trim()
                  //   .replaceAll("<", "")
                  //   .trim()
                  //   .replaceAll('"', "")
                  //   .trim()
                  //   .replace("value", "")
                  //   .trim()
                  //   .replace("=", "")
                  //   .trim();
                  temp3.push({ value: temp9, label: temp10 });
                }
              }
              setdatas(temp3);
              filter_ran += 1;
            } else if (
              temp[i].includes("this.form.submit()") &&
              filter_ran == 3
            ) {
              let temp4 = [{ value: "", label: "Upcoming" }];
              for (let h = i + 6; h < temp.length; h++) {
                if (temp[h].includes('src="/lib/javascript/slick.min.js"')) {
                  break;
                }
                if (temp[h].includes("value") && temp[h].includes("=")) {
                  const temp11 = temp[h]
                    .trim()
                    .replace("value", "")
                    .replace("=", "")
                    .trim()
                    .replaceAll('"', "")
                    .trim();
                  const temp12 = temp[h + 2].trim().replace(">", "").trim();
                  temp4.push({ value: temp11, label: temp12 });
                }
              }
              setcounter(temp4);
              filter_ran += 1;
            }
          }
          setTourneys(temp_tourney);
        } catch (e) {
          router.replace("/");
        }
      } else {
        // console.log("WROMG");
      }
    });
  }, []);
  const overlayyes = () => {
    if (ontop) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => setontop(false));
    } else {
      setontop(true);
    }
  };
  useEffect(() => {
    if (ontop) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [ontop]);

  const searchypls = (text) => {
    let temp = tourneys.map((thingy) => {
      if (
        thingy.name.toLowerCase().includes(text.toLowerCase()) ||
        thingy.city.toLowerCase().includes(text.toLowerCase()) ||
        thingy.state.toLowerCase().includes(text.toLowerCase()) ||
        thingy.date.toLowerCase().includes(text.toLowerCase())
      ) {
        return { ...thingy, show: "show" };
      } else {
        return { ...thingy, show: "hide" };
      }
    });
    setTourneys(temp);
  };
  const searchhhh = (text) => {
    sethardsearch(text);
  };

  const new_query_fetch = async (thing, valop) => {
    const thingy = await SecureStore.getItemAsync("cookie");
    let gop = new URLSearchParams();
    // gop.append("circuit_id", circuit);
    if (valop === "circuit") {
      gop.append("circuit_id", thing);
      gop.append("year", year);
      gop.append("state", state);
      gop.append("country", country);
    } else if (valop === "year") {
      gop.append("circuit_id", circuit);
      gop.append("state", state);
      gop.append("country", country);
      gop.append("year", thing);
    } else if (valop === "state") {
      gop.append("state", thing);
      gop.append("year", year);
      gop.append("circuit_id", circuit);
      gop.append("country", country);
    } else if (valop === "country") {
      gop.append("circuit_id", circuit);
      gop.append("year", year);
      gop.append("state", state);
      gop.append("country", thing);
    }
    // IT FREEKING WORKS; FINALLY
    // console.log(gop.toString());

    let tourney_header = {
      Host: "www.tabroom.com",
      "Content-Type": "application/x-www-form-urlencoded",
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
      {
        method: "POST",
        headers: tourney_header,
        body: gop,
      },
    );

    const tourney_result = await touney_request.text();
    const temp = tourney_result.split("\n");
    let temp_tourney = [];
    for (let i = 0; i < temp.length; i++) {
      // console.log(temp[i]);
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
        console.log("WORK");
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
          show: "show",
          tipe: type2,
          registration: type3,
        });
      }
    }
    setTourneys(temp_tourney);
  };

  const circuit_value = (item) => {
    // console.log("ChANGIN");
    setCircuit(item.value);
    new_query_fetch(item.value, "circuit");
  };
  const year_value = (item) => {
    setYear(item.value);
    new_query_fetch(item.value, "year");
  };
  const state_value = (item) => {
    console.log(item.value);
    setState(item.value);
    new_query_fetch(item.value, "state");
  };
  const country_value = (item) => {
    setCountry(item.value);
    new_query_fetch(item.value, "country");
  };
  const searchthing = async (thing) => {
    Keyboard.dismiss();
    setCircuit("");
    setYear("0");
    setState("");
    setCountry("");
    const thingys = await SecureStore.getItemAsync("cookie");
    const headers = {
      Host: "www.tabroom.com",
      Cookie: thingys,
      "Cache-Control": "max-age=0",
      "Sec-Ch-Ua": '"Not-A.Brand";v="24", "Chromium";v="146"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Accept-Language": "en-US,en;q=0.9",
      Origin: "https://www.tabroom.com",
      "Content-Type": "application/x-www-form-urlencoded",
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
    };
    let hoop = new URLSearchParams();
    hoop.append("search", thing);
    hoop.append("tourn_id", "");
    hoop.append("caller", "/index/search.mhtml");
    const request = await fetch("https://www.tabroom.com/index/search.mhtml", {
      method: "POST",
      headers: headers,
      body: hoop,
    });
    const result = await request.text();
    const plop = result.split("\n");
    let temp_tourney = [];
    let seen = false;

    for (let i = 0; i < plop.length; i++) {
      if (
        plop[i].includes(
          "bluetext semibold full padvertless link-underline hover padleft",
        )
      ) {
        let thing23 = "";
        let yummy = "";
        let temp393 = [];
        let thingy24 = "";
        for (let j = i + 1; j < plop.length; j++) {
          if (
            plop[j].includes(
              "bluetext semibold full padvertless link-underline hover padleft",
            )
          ) {
            break;
          }
          if (plop[j].includes("data-text")) {
            thing23 = plop[j + 1].trim().replace("&ndash;", "-").trim();
            seen = true;
          }

          if (
            plop[j].includes(
              "full centeralign padvertless padleft padright nowrap",
            )
          ) {
            thingy24 = plop[j]
              .replaceAll(
                "full centeralign padvertless padleft padright nowrap",
                "",
              )
              .trim()
              .replaceAll("span", "")
              .trim()
              .replaceAll("class=", "")
              .trim()
              .replaceAll(">", "")
              .trim()
              .replaceAll("<", "")
              .trim()
              .replaceAll('"', "")
              .replaceAll("/", "")
              .trim()
              .replaceAll("'", "");
          }
          if (
            plop[j].includes(
              "padleft padright half smaller nospace padvertless nowrap",
            )
          ) {
            yummy = plop[j]
              .replaceAll(
                "padleft padright half smaller nospace padvertless nowrap",
                "",
              )
              .trim()
              .replaceAll("span", "")
              .trim()
              .replaceAll("class=", "")
              .trim()
              .replaceAll(">", "")
              .trim()
              .replaceAll("<", "")
              .trim()
              .replaceAll('"', "")
              .replaceAll("/", "")
              .trim()
              .replaceAll("'", "");
            const current = yummy.split("  ");
            for (let k = 0; k < current.length; k++) {
              if (current[k].includes("title=")) {
                const temp783589 = current[k].split("=");
                temp393.push(temp783589[1].trim().replaceAll('"', "").trim());
              }
            }
            console.log(temp393);
          }
          // console.log(yummy.split("  "));
          // const banana = yummy.split("  ");
          // for (let k = 0; k < banana.length; k++) {
          //   if (banana[k].includes("title=")) {
          //     temp393.push(
          //       banana[k]
          //         .trim()
          //         .replaceAll('"', "")
          //         .replace("title=", "")
          //         .trim(),
          //     );
          //   }
          // }
        }
        let temp33 = plop[i + 9].trim() + plop[i + 11].trim();
        if (plop[i + 9].trim() == ",") {
          temp33 = plop[i + 11].trim();
        }
        //YOOO EVETYHING IS ACTUALLY STUFFED INTO ONE LINE FOR THE EVENT DEETAILSS

        temp_tourney.push({
          name: plop[i + 4].trim(),
          reference: plop[i + 1]
            .trim()
            .replace('href="/index/tourn/index.mhtml?tourn_id=', "")
            .replace(" ", "")
            .replaceAll("href", "")
            .replace('"/index/tourn/index.mhtml?tourn_id=', "")
            .trim()
            .replace('"', " ")
            .replace("=", "")
            .trim(),
          location: temp33,
          events: temp393,
          date: thing23,
          circuit: thingy24, // HONESTLY I HAVE NO IDEA IF I AM GOING TO BE USING THIS CuZ IT SEEMSSSSS USELESSSS BUT IDK; JUST PUTTING IT IN THERE JIC
        });
      }
    }

    console.log(temp_tourney);
  };

  //THAT ACTUALLY WORKS REALLY WELL
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: light_dark ? "rgb(21, 20, 20)" : "white",
        }}
      >
        <Stack.Screen
          options={{
            title: "Tournaments",
            headerStyle: {
              backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
            },
            headerTintColor: light_dark ? "#ffffff" : "black",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TextInput
            style={{
              marginLeft: 20,
              width: "80%",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: light_dark ? "white" : "black",
              padding: 10,
              color: light_dark ? "white" : "black",
            }}
            onChangeText={searchypls}
            placeholderTextColor={light_dark ? "white" : "black"}
            placeholder="Search tournaments..."
          />
          <TouchableOpacity onPress={overlayyes}>
            <FontAwesome5
              name="filter"
              size={24}
              color={light_dark ? "white" : "black"}
              style={{ marginTop: 5, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, marginTop: 10 }}>
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
                style={[
                  styles.tourneyButton,
                  {
                    display: thingy.show == "show" ? "flex" : "none",
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
                key={thingy.reference}
                onPress={() => {
                  router.navigate("/Tourneys/current/curry", {
                    params: { reference: thingy.reference },
                  });
                  //SHOULD REDIRECT TO TOURNAMENT PAGE// LATER PROBLEM
                }}
              >
                <View>
                  <Text style={{ color: "blue" }}>Date: {thingy.date}</Text>
                  <Text style={{ color: light_dark ? "white" : "black" }}>
                    Name: {thingy.name}
                  </Text>
                  <Text style={{ color: light_dark ? "white" : "black" }}>
                    City: {thingy.city}
                  </Text>
                  <Text style={{ color: light_dark ? "white" : "black" }}>
                    State: {thingy.state}
                  </Text>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ color: light_dark ? "white" : "black" }}>
                      Type:
                    </Text>
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
                      color={light_dark ? "white" : "black"}
                    />
                    <FontAwesome6
                      name="person"
                      size={24}
                      display={
                        thingy.tipe == "P" || thingy.tipe == "PO"
                          ? "flex"
                          : "none"
                      }
                      color={light_dark ? "white" : "black"}
                    />
                  </View>
                  <Text style={{ color: registration_color }}>
                    Registration: {thingy.registration}
                  </Text>
                </View>
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
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </ScrollView>
        <NavBar />
        <Animated.View
          style={[
            styles.ontop,
            {
              backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
              display: ontop ? "flex" : "none",
              opacity: fadeAnim,
              shadowRadius: 5,
              elevation: 10,
              shadowColor: light_dark ? "white" : "black",
              shadowOffset: { width: 10, height: 2 },
              shadowOpacity: 0.8,
            },
          ]}
        >
          <View>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 10,
                marginBottom: 10,
                color: light_dark ? "white" : "black",
                fontSize: 20,
              }}
            >
              Broad Tourney Search:
            </Text>
            <TextInput
              style={{
                color: light_dark ? "white" : "black",
                fontSize: 15,
                borderRadius: 10,
                marginLeft: 10,
                marginRight: 10,
                borderWidth: 1,
                borderColor: light_dark ? "white" : "black",
                backgroundColor: light_dark
                  ? "rgb(46,45,45)"
                  : "rgb(255,250,250)",
              }}
              placeholder="Enter Tournament Name"
              value={hardsearch}
              placeholderTextColor={light_dark ? "white" : "black"}
              onChangeText={searchhhh}
              returnKeyType="done"
              blurOnSubmit={true}
              onBlur={() => {
                Keyboard.dismiss();
              }}
              onEndEditing={(e) => {
                searchthing(e.nativeEvent.text);
              }}
            />
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Text
              style={{
                marginLeft: 10,
                color: light_dark ? "white" : "black",
                fontSize: 20,
              }}
            >
              Circuit:
            </Text>
            <Dropdown
              placeholderStyle={[
                styles.placeholderStyle,
                {
                  color: light_dark ? "white" : "black",
                },
              ]}
              style={[
                styles.dropdown,
                {
                  backgroundColor: light_dark
                    ? "rgb(46,45,45)"
                    : "rgb(255,250,250)",
                  borderColor: light_dark ? "white" : "black",
                },
              ]}
              onChange={circuit_value}
              selectedTextStyle={styles.selectedTextStyle}
              data={circuit_data}
              labelField="label"
              autoScroll={false}
              valueField="value"
              placeholder="Select circuit"
              value={circuit}
              search={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: light_dark ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              School year Ending:
            </Text>
            <Dropdown
              placeholderStyle={[
                styles.placeholderStyle,
                {
                  color: light_dark ? "white" : "black",
                },
              ]}
              style={[
                styles.dropdown,
                {
                  backgroundColor: light_dark
                    ? "rgb(46,45,45)"
                    : "rgb(255,250,250)",
                  borderColor: light_dark ? "white" : "black",
                },
              ]}
              onChange={year_value}
              selectedTextStyle={styles.selectedTextStyle}
              data={yr}
              labelField="label"
              autoScroll={false}
              valueField="value"
              placeholder="Select Year"
              value={year}
              search={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: light_dark ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              States/Provinces:
            </Text>
            <Dropdown
              placeholderStyle={[
                styles.placeholderStyle,
                {
                  color: light_dark ? "white" : "black",
                },
              ]}
              style={[
                styles.dropdown,
                {
                  backgroundColor: light_dark
                    ? "rgb(46,45,45)"
                    : "rgb(255,250,250)",
                  borderColor: light_dark ? "white" : "black",
                },
              ]}
              onChange={state_value}
              selectedTextStyle={styles.selectedTextStyle}
              data={statep}
              labelField="label"
              autoScroll={false}
              valueField="value"
              placeholder="Select State/Province"
              value={state}
              search={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: light_dark ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Countries:{" "}
            </Text>
            <Dropdown
              placeholderStyle={[
                styles.placeholderStyle,
                {
                  color: light_dark ? "white" : "black",
                },
              ]}
              style={[
                styles.dropdown,
                {
                  backgroundColor: light_dark
                    ? "rgb(46,45,45)"
                    : "rgb(255,250,250)",
                  borderColor: light_dark ? "white" : "black",
                },
              ]}
              onChange={country_value}
              selectedTextStyle={styles.selectedTextStyle}
              data={counter}
              labelField="label"
              autoScroll={false}
              valueField="value"
              placeholder="Select Country"
              value={country}
              search={true}
            />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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
  ontop: {
    position: "absolute",
    bottom: "20%",
    width: "85%",
    borderRadius: 15,
    marginLeft: "7.5%",
    transitionDuration: "0.5s",
    height: "65%",
    backgroundColor: "white",
  },
  placeholderStyle: {
    fontSize: 17,
    color: "rgb(100, 100, 100)",
  },
  dropdown: {
    width: "90%",
    marginLeft: 20,
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    elevation: 3,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: "black",
    backgroundColor: "rgba(232, 228, 228, 0.72)",
  },
});
