import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { auth } from "../../../../firebaseConfig.js";

// import { Ionicons } from '@expo/vector-icons';
// import NavBar from "../NavBar";
//Home Featureset
//
// [[{ref: existe, actual thing}, {ref: existe, actual thing}], [], [], []] -- > 2d is another person, well another pairing / THE MASTER PLAN
export default function THINGY4() {
  const [pairings_info, setpairingsinfo] = useState([{}]);
  const [panel2, setpanel2] = useState([{}]);
  const [panel2selected, setpanel2selected] = useState("");
  const [pairing_eventy, setpairing_eventy] = useState("");
  const [pairing_page_existe, setPairingPageExist] = useState(true);
  const [update, setupdate] = useState([]);
  const [pairing_panel_1, setPairingPanel1] = useState([{}]);
  const [current_pairing_event, setCurrentPairingEvent] = useState("");
  const [invite_data, setInviteData] = useState(``);
  const [webViewHeight, setWebViewHeight] = useState(500);
  const [judges_page_existe, setJudgesPageExist] = useState(true);
  const [judge_eventy, setJudgeEventy] = useState("");
  const [judge_page, setJudgePage] = useState([{}]);
  const [entries_data, setEntriesData] = useState([]);
  const router = useRouter();
  const [judging_data, setJudgingData] = useState([]);
  const [noentriesexisty, setnoentriesexisty] = useState(false);
  const [light_dark, setld] = useState(false);
  const [page, setpage] = useState("invite");
  const [institutiondata, setInstitutionData] = useState(
    "Institutions Attending: ",
  );
  const [dateinfo, setDateInfo] = useState("Date: ");
  const [currevent, setcurrevent] = useState("");
  const [hola, setHola] = useState([" "]);
  const [nopurpose, setskdjf] = useState([" "]);
  const [institutions, setInstitutions] = useState(false);
  const [dates, setDates] = useState(false);
  const [uploads, setUploads] = useState(false);
  const [uploads_data, setuploaddataa] = useState([]); // IT FREAKING WORKS
  //   const [name, setName] = useState("");
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
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      let reference = "";
      for (let i = 0; i < panel2.length; i++) {
        if (panel2[i].name === panel2selected) {
          reference = panel2[i].ref.trim();
        }
      }
      let headers = {
        Host: "www.tabroom.com",
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
          "https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=40497&round_id=1535084",
        Priority: "u=0, i",
      };
      const request = await fetch("https:/www.tabroom.com" + reference);
      const response = await request.text();
      const hi = response.split("\n");
      if (response.includes('<tr class="smallish">')) {
        setCurrentPairingEvent("debate");
        let pairings = [];
        let roomys = [];
        for (let i = 0; i < hi.length; i++) {
          if (hi[i].includes('<tr class="yellowrow smallish padless">')) {
            for (let j = i; j < hi.length; j++) {
              if (hi[j].includes("</tr>")) {
                break;
              }
              if (
                hi[j].includes("centeralign") &&
                !hi[j + 1].includes("</th>")
              ) {
                roomys.push(hi[j + 1].trim());
              } else if (
                hi[j].includes("centeralign") &&
                hi[j + 1].includes("</th>")
              ) {
                roomys.push(" ");
              }
            }
          } // ROOMYYY STUFF
          let propy = [];
          if (hi[i].includes('<tr class="smallish">')) {
            // bUNCH of these exist
            let counter = 0;
            for (let j = i; j < hi.length; j++) {
              // UNDER THE TR, WHICH MEANS ONE PAIRING ENTRY THING
              let linky = "";
              let namey = "";
              if (hi[j].includes("</tr>")) {
                break;
              }
              if (hi[j].includes("<td")) {
                // ONE FIELD

                for (let y = j; y < hi.length; y++) {
                  if (hi[y].trim() == "") {
                    continue;
                  } else if (
                    hi[y].includes("/index/tourn") ||
                    hi[y].includes("tourn_id")
                  ) {
                    linky = hi[y]
                      .trim()
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', "")
                      .replaceAll('target = "_blank"', "");
                  } else if (hi[y].includes("http")) {
                    linky = hi[y]
                      .trim()
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', "")
                      .replaceAll('target = "_blank"', "");
                  } else if (
                    hi[y].trim() != "" &&
                    !hi[y].includes("<") &&
                    !hi[y].includes(">") &&
                    !hi[y].includes("class")
                  ) {
                    namey +=
                      " " +
                      hi[y]
                        .trim()
                        .replaceAll('target = "_blank"', "")
                        .replaceAll('"', "");
                  }
                  if (hi[y].includes("</td>")) {
                    break;
                  }
                }
                propy.push({
                  show: true,
                  link: linky,
                  name: roomys[counter] + " : " + namey,
                });
                counter++;
              }
            }
            pairings.push(propy);
          }
        }
        setpairingsinfo(pairings);
      } else if (response.includes("<tr>")) {
        setCurrentPairingEvent("speech");
        let pairingss = [];
        let roomys = [];
        for (let i = 0; i < hi.length; i++) {
          if (hi[i].includes('<tr class="yellowrow">')) {
            for (let j = i; j < hi.length; j++) {
              if (hi[j].includes("</tr>")) {
                break;
              }
              if (hi[j].includes("<th") && !hi[j + 1].includes("</th>")) {
                roomys.push(hi[j + 1].trim().replaceAll("&amp;", "&"));
              } else if (hi[j].includes("<th") && hi[j + 1].includes("</th>")) {
                roomys.push(" ");
              }
            }
          }
          let propy = [];
          if (hi[i].includes("<tr>")) {
            let counter = 0;
            for (let j = i; j < hi.length; j++) {
              let linky = "";
              let namey = "";
              if (hi[j].includes("</tr>")) {
                break;
              }
              if (hi[j].includes("<td")) {
                for (let y = j; y < hi.length; y++) {
                  if (hi[y].trim() == "") {
                    continue;
                  } else if (hi[y].includes("/index/tourn")) {
                    linky = hi[y]
                      .trim()
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', "");
                  } else if (hi[y].includes("http")) {
                    linky = hi[y]
                      .trim()
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', "");
                  } else if (
                    hi[y].trim() != "" &&
                    !hi[y].includes("<") &&
                    !hi[y].includes(">") &&
                    !hi[y].includes("class") &&
                    !hi[y].includes("data-text") &&
                    !hi[y].includes("style=") &&
                    !hi[y].includes("title=")
                  ) {
                    if (hi[y].includes("href")) {
                      namey += "\n";
                    } else {
                      namey += hi[y].trim().replaceAll('"', "") + " ";
                    }
                  }
                  if (hi[y].includes("</td>")) {
                    break;
                  }
                }
                propy.push({
                  link: linky,
                  name: roomys[counter] + " : " + namey,
                  show: true,
                });
                counter++;
              }
            }
            pairingss.push(propy);
          }
        }
        // console.log(pairingss);
        // console.log(roomys);
        setpairingsinfo(pairingss);
      } else if (response.includes('<tr class="yellowrow smaller">')) {
        setCurrentPairingEvent("congress");
        let roomys = [];
        let pairings = [];
        for (let i = 0; i < hi.length; i++) {
          if (hi[i].includes('<tr class="yellowrow smaller">')) {
            for (let j = i; j < hi.length; j++) {
              if (hi[j].includes("</tr>")) {
                break;
              }
              if (hi[j].includes("<th") && !hi[j + 1].includes("</th>")) {
                roomys.push(hi[j + 1].trim().replaceAll("&amp;", "&"));
              } else if (hi[j].includes("<th") && hi[j + 1].includes("</th>")) {
                roomys.push(" ");
              }
            }
          }
          let propy = [];
          if (hi[i].includes("<tr")) {
            let counter = 0;
            for (let j = i; j < hi.length; j++) {
              let linky = "";
              let namey = "";
              if (hi[j].includes("</tr>")) {
                break;
              }
              if (hi[j].includes("<td")) {
                for (let y = j; y < hi.length; y++) {
                  if (hi[y].trim() == "") {
                    continue;
                  } else if (hi[y].includes("/index/tourn")) {
                    linky = hi[y]
                      .trim()
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', "");
                  } else if (hi[y].includes("http")) {
                    linky = hi[y]
                      .trim()
                      .replaceAll(" ", "")
                      .replaceAll("href=", "")
                      .replaceAll('"', "");
                  } else if (
                    hi[y].trim() != "" &&
                    !hi[y].includes("<") &&
                    !hi[y].includes(">") &&
                    !hi[y].includes("class") &&
                    !hi[y].includes("data-text") &&
                    !hi[y].includes("style=") &&
                    !hi[y].includes("title=") &&
                    !hi[y].includes("_blank")
                  ) {
                    if (hi[y].includes("href")) {
                      namey += "\n";
                    } else {
                      namey += hi[y].trim().replaceAll('"', "") + ", ";
                    }
                  } else if (hi[y].includes("quarter")) {
                    namey += "\n";
                  }
                  if (hi[y].includes("</td>")) {
                    break;
                  }
                }
                propy.push({
                  link: linky,
                  name: roomys[counter] + " : " + namey,
                  show: true,
                });
                counter++;
              }
            }
            pairings.push(propy);
          }
        }

        setpairingsinfo(pairings);
      }
    };
    hello();
  }, [panel2selected]);

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

          //   console.log(hi_page);
        } catch (e) {
          router.replace("/");
        }
      } else {
      }
    });
  }, []);
  useEffect(() => {
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      let headers = {
        Host: "www.tabroom.com",
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
        "https://www.tabroom.com/index/tourn/postings/index.mhtml?tourn_id=" +
          reference,
        {
          method: "GET",
          headers: headers,
          redirect: "follow",
        },
      );
      const response = await request.text();
      const hi = response.split("\n");
      let current_clicky = "";
      for (let i = 0; i < pairing_panel_1.length; i++) {
        if (pairing_eventy === pairing_panel_1[i].nameything) {
          current_clicky = pairing_panel_1[i].value_ref;
        }
      }
      let rouns = [];
      for (let i = 0; i < hi.length; i++) {
        if (
          hi[i].includes("padleft blueborderleft eventListing hidden") &&
          hi[i].includes(current_clicky.trim())
        ) {
          for (let j = i + 1; j < hi.length; j++) {
            if (hi[j].includes("padleft blueborderleft eventListing hidden")) {
              break;
            }
            if (hi[j].includes("/index/tourn/postings/round.mhtml")) {
              let round_name = "";
              for (let y = j + 2; y < hi.length; y++) {
                if (hi[y].includes("</a>")) {
                  break;
                }
                round_name += hi[y].trim() + "";
              }

              rouns.push({
                ref: hi[j].trim().replaceAll("href=", "").replaceAll('"', ""),
                name: round_name,
              });
            }
          }

          break;
        }
      }
      setpanel2(rouns);
      if (rouns.length > 0) {
        setpanel2selected(rouns[0].name);
      }
    };

    hello();
  }, [pairing_eventy]);

  const invite_load = async () => {
    setpage("invite");
  };
  const entries_load = async () => {
    setpage("entries");
  };
  const judges_load = async () => {
    setpage("judges");
  };
  const pairings_load = async () => {
    setpage("pairings");
  };
  const results_load = async () => {
    setpage("results");
  };
  const institution_load = async () => {
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
      Referer: "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=40477",
      Priority: "u=0, i",
      Connection: "keep-alive",
    };
    const request = await fetch(
      "https://www.tabroom.com/index/tourn/schools.mhtml?tourn_id=" + reference,
      { method: "GET", headers: header, redirect: "follow" },
    );
    const pop = await request.text();
    const hi = pop.split("\n");
    // console.log("WORKING");
    let twemp = "";
    for (let i = 0; i < hi.length; i++) {
      if (hi[i].includes("fivesixth nowrap")) {
        twemp += "(" + hi[i + 5].trim() + ") " + hi[i + 1].trim() + ";\t";
      }
    }
    // console.log(twemp);
    setInstitutionData(
      twemp.trim() == ""
        ? "PS: Most tournaments don't upload this for some reason making life Harder, fun! "
        : "Institutions Attending" + twemp,
    );
    setInstitutions(!institutions);
  };

  const date_load = async () => {
    const thingy = await SecureStore.getItemAsync("cookie");
    const headers = {
      Host: " www.tabroom.com",
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
      Referer: " https://www.tabroom.com/index/search.mhtml",
      Priority: " u=0, i",
    };
    const request = await fetch(
      "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=" + reference,
      {
        method: "GET",
        headers: headers,
        redirect: "follow",
      },
    );
    const pop = await request.text();
    const grumpy = pop.split("\n");
    let information = "";
    for (let i = 0; i < grumpy.length; i++) {
      if (
        grumpy[i].includes("semibold") &&
        grumpy[i].includes("smaller half")
      ) {
        let second_info = "";
        let found = false;
        for (let j = i + 2; j < grumpy.length; j++) {
          if (found) {
            second_info += grumpy[j].trim() + " ";
          }
          if (grumpy[j].includes("smaller half")) {
            found = true;
          }
          if (grumpy[j].includes("</span>") && found) {
            break;
          }
        }
        information +=
          grumpy[i + 1].trim() +
          ":" +
          second_info.replaceAll("</span>", "") +
          "\n";
      }
    }
    setDateInfo(information);
  };
  const load_entries = async () => {
    const thingy = await SecureStore.getItemAsync("cookie");
    let headers = {
      Host: " www.tabroom.com",
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
      Priority: " u=0, i",
    };
    const request = await fetch(
      "https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=" +
        reference.trim(),
      { method: "GET", headers: headers, redirect: "follow" },
    );
    const name12 = await request.text();
    // console.log(name12);
    const name23 = name12.split("\n");
    const button_page_render = [];
    for (let i = 0; i < name23.length; i++) {
      if (
        name23[i].includes("dkblue full") ||
        name23[i].includes("blue full")
      ) {
        button_page_render.push({
          linky: name23[i + 1]
            .replaceAll("href=", "")
            .replaceAll('"', "")
            .replaceAll(">", "")
            .trim(),
          namey: name23[i + 2].trim(),
        });
      }
    }
    setEntriesData(button_page_render);
    if (button_page_render.length > 0) {
      setcurrevent(button_page_render[0].namey || "");
    }
    // console.log(button_page_render);
  };
  useEffect(() => {
    if (page === "entries") {
      load_entries();
    } else if (page === "judges") {
      load_judges();
    } else if (page == "pairings") {
      load_pairings();
    }
  }, [page]);
  const load_judges = async () => {
    const thingy = await SecureStore.getItemAsync("cookie");
    let headers = {
      Host: " www.tabroom.com",
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
        "https://www.tabroom.com/index/tourn/judges.mhtml?tourn_id=" +
        reference,
      Priority: " u=0, i",
    };
    const request = await fetch(
      "https://www.tabroom.com/index/tourn/judges.mhtml?tourn_id=" +
        reference.trim(),
      {
        method: "GET",
        headers: headers,
        redirect: "follow",
      },
    );
    const response = await request.text();
    const hi_thing = response.split("\n");
    let judge_events = [];
    for (let i = 0; i < hi_thing.length; i++) {
      if (hi_thing[i].includes("twofifths semibold bluetext padleft")) {
        judge_events.push({
          eventy: hi_thing[i + 1].trim(),
          referency: hi_thing[i + 7]
            .trim()
            .replaceAll("href=", "")
            .replaceAll('"', "")
            .replaceAll(">", "")
            .trim(),
        });
      }
    }
    if (judge_events.length == 0) {
      setJudgesPageExist(false);
    } else {
      setJudgeEventy(judge_events[0].eventy);
      setJudgesPageExist(true);
    }
    console.log(judge_events);
    setJudgingData(judge_events);
  };

  const load_uplaods = async () => {
    const thingy = await SecureStore.getItemAsync("cookie");
    let headers = {
      Host: " www.tabroom.com",
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
      Referer: " https://www.tabroom.com/index/search.mhtml",
      Priority: " u=0, i",
    };
    const request = await fetch(
      "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=" + reference,
      { method: "GET", headers: headers, redirect: "follow" },
    );
    const answer = await request.text();
    const bye = answer.split("\n");
    let thingyfor = [];
    for (let i = 0; i < bye.length; i++) {
      if (bye[i].includes("Pages &amp; Uploads")) {
        for (let j = i + 1; j < bye.length; j++) {
          let link = "";
          let namelink = "";
          if (bye[j].includes("yellow full")) {
            // console.log("FOUND");
            link = bye[j + 1].trim().replace("href=", "").replaceAll('"', "");
            if (!link.includes("://")) {
              link = "https://www.tabroom.com" + link;
              namelink = bye[j + 2]
                .trim()
                .replaceAll("</a>", "")
                .replaceAll(">", "");
            } else {
              namelink = bye[j + 4].trim();
            }
          }
          if (namelink != "" && link != "") {
            thingyfor.push({ link: link, name: namelink });
          }
        }
        break;
      }
    }
    // console.log(thingyfor);
    setuploaddataa(thingyfor);
  };

  useEffect(() => {
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      const header = {
        Host: " www.tabroom.com",
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
          "https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=" +
          reference.trim(),
        Priority: " u=0, i",
      };
      let eventpr = "";
      for (let i = 0; i < judging_data.length; i++) {
        if (judging_data[i].eventy === judge_eventy) {
          eventpr = judging_data[i].referency;
          break;
        }
      }

      const request = await fetch("https://www.tabroom.com" + eventpr, {
        method: "GET",
        headers: header,
        redirect: "follow",
      });
      let judge_info_fields = [];
      const response = await request.text();
      const hi = response.split("\n");
      let times = 0;
      let plain_information = [];
      for (let i = 0; i < hi.length; i++) {
        if (hi[i].includes("<thead>")) {
          for (let j = i + 1; j < hi.length; j++) {
            if (hi[j].includes("</thead>")) {
              break;
            }
            if (
              hi[j].includes("<th") &&
              !hi[j + 1].includes("Record") &&
              !hi[j + 1].includes("Paradigm")
            ) {
              judge_info_fields.push(hi[j + 1].trim());
            }
          }
        }
        let first_thing = 0;
        let information = "";
        let paradigm = "";
        let ran = false;
        if (hi[i].includes('tr class="smaller"')) {
          for (let j = i + 1; j < hi.length; j++) {
            if (hi[j].includes("</tr>")) {
              break;
            }
            if (hi[j].includes("<td")) {
              if (
                hi[j + 1].includes("<a") &&
                hi[j + 3].includes(
                  "buttonwhite bluetext fa fa-xs fa-file-text-o padless padleft",
                )
              ) {
                paradigm = hi[j + 2]
                  .trim()
                  .replaceAll('"', "")
                  .replaceAll("href  =", "")
                  .replaceAll("href=", "");
              } else if (
                !hi[j + 1].includes("</td>") &&
                !hi[j + 2].includes(
                  "buttonwhite bluetext fa fa-sm padless fa-file-text marno",
                )
              ) {
                if (
                  hi[j + 1].includes("<a") &&
                  !hi[j + 4].includes("white full padvert padleft")
                ) {
                  information +=
                    judge_info_fields[first_thing] +
                    ":" +
                    " " +
                    hi[j + 4].trim() +
                    ";";
                } else if (
                  hi[j + 1].includes("<a") &&
                  hi[j + 4].includes("white full padvert padleft")
                ) {
                  // information +=
                  //   judge_info_fields[first_thing] + ":" + " " + ";";
                  continue;
                } else {
                  information +=
                    judge_info_fields[first_thing] +
                    ":" +
                    " " +
                    hi[j + 1].trim() +
                    ";";
                }
                first_thing++;
              }
            }
          }
          plain_information.push({
            info: information,
            paradime: paradigm,
            show: true,
            expand: false,
            details: "",
          });
        }
      }
      setJudgePage(plain_information);
    };
    hello();
  }, [judge_eventy]);

  const run_info_fetch = async (linkfetch) => {
    const thingy = await SecureStore.getItemAsync("cookie");
    let eventpr = "";
    for (let i = 0; i < judging_data.length; i++) {
      if (judging_data[i].eventy === judge_eventy) {
        eventpr = judging_data[i].referency;
        break;
      }
    }
    let headers = {
      Host: " www.tabroom.com",
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
      Referer: "https://www.tabroom.com" + eventpr,
      Priority: " u=0, i",
    };
    const request = await fetch("https://www.tabroom.com/" + linkfetch, {
      method: "GET",
      headers: headers,
      redirect: "follow",
    });
    const response = await request.text();
    const hi = response.split("\n");
    let data_curry = "";
    let end = false;
    for (let i = 0; i < hi.length; i++) {
      if (hi[i].includes("</div>") && end) {
        break;
      }
      if (end) {
        console.log(hi[i]);
        data_curry += hi[i] + "\n";
      }
      if (hi[i].includes("paradigm ltborderbottom")) {
        end = true;
      }
    }

    setJudgePage(
      judge_page.map((item) => {
        if (item.paradime == linkfetch) {
          return { ...item, details: data_curry, expand: true };
        }
        return item;
      }),
    );
    // console.log(response);

    //paradigm ltborderbottom
  };

  useEffect(() => {
    const hello = async () => {
      let event_id = ""; // THIS IS NOT EVENT_ID --> IT IS ACtuAlY SUBLINK under tabroom.com,  I SWEAR BRUV STUFF IS WEIRDDDDD ON THIS WEBSITE
      for (let i = 0; i < entries_data.length; i++) {
        if (entries_data[i].namey === currevent) {
          event_id = entries_data[i].linky;
          break;
        }
      }
      const thingy = await SecureStore.getItemAsync("cookie");
      let headers = {
        Host: " www.tabroom.com",
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
          "https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=39094",
        Priority: " u=0, i",
      };
      const request = await fetch("https://www.tabroom.com" + event_id, {
        method: "GET",
        headers: headers,
        redirect: "follow",
      });
      const response = await request.text();
      const hi = response.split("\n");
      let currentpage = [];
      for (let i = 0; i < hi.length; i++) {
        if (hi[i].includes("<tr>")) {
          let entry = "";
          for (let j = i + 1; j < hi.length; j++) {
            if (hi[j].includes("<td")) {
              entry += hi[j + 1].trim().replaceAll("<a", "") + ";";
            }
            if (hi[j].includes("</tr>")) {
              currentpage.push({ entry: entry, show: true });
              break;
            }
          }
        }
        if (hi[i].includes("</tbody>")) {
          break;
        }
      }
      if (entries_data == null || entries_data.length === 0) {
        currentpage = [];
        setnoentriesexisty(true);
      } else {
        setnoentriesexisty(false);
      }
      setupdate(currentpage);
    };
    hello();
  }, [currevent]);

  const load_pairings = async () => {
    const thingy = await SecureStore.getItemAsync("cookie");
    let headers = {
      Host: "www.tabroom.com",
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
      "https://www.tabroom.com/index/tourn/postings/index.mhtml?tourn_id=" +
        reference,
      {
        method: "GET",
        headers: headers,
        redirect: "follow",
      },
    );
    const responst = await request.text();
    const hi = responst.split("\n");
    let information = [];
    for (let i = 0; i < hi.length; i++) {
      if (hi[i].includes("even full centeralign")) {
        for (let j = i + 7; j < hi.length; j++) {
          if (hi[j].includes("value=")) {
            // console.log(
            //   hi[j]
            //     .trim()
            //     .replaceAll('"', "")
            //     .replaceAll("value=", "")
            //     .replaceAll("<option", ""),
            // );
            // console.log(
            //   hi[j + 2]
            //     .trim()
            //     .replaceAll('"', "")
            //     .replaceAll("</option>", "")
            //     .replaceAll(">", ""),
            // );
            information.push({
              value_ref: hi[j]
                .trim()
                .replaceAll('"', "")
                .replaceAll("value=", "")
                .replaceAll("<option", "")
                .trim(),
              nameything: hi[j + 2]
                .trim()
                .replaceAll('"', "")
                .replaceAll("</option>", "")
                .replaceAll(">", "")
                .trim(),
            });
          }
        }
        break;
      }
    }
    if (information.length > 0) {
      setpairing_eventy(information[0].nameything);
      setPairingPageExist(true);
    } else {
      setPairingPageExist(false);
    }
    setPairingPanel1(information);
  };

  useEffect(() => {
    const hello = async () => {
      const thingy = await SecureStore.getItemAsync("cookie");
      const temp = await AsyncStorage.getItem("theme");
      const temp_2 = !(temp == "light");
      const light_dark = temp_2;
      // console.log(thingy);
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
        "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=" + reference,
        {
          method: "GET",
          headers: header_page,
          redirect: "follow",
        },
      );
      const pop_page = await request_page.text();
      const hi_page = pop_page.split("\n");
      let page_render = "";
      let found = false;
      for (let i = 0; i < hi_page.length; i++) {
        if (hi_page[i].includes("</div>") && found) {
          found = false;
          break;
        }
        if (
          hi_page[i].includes(
            "thenines leftalign plain martop whiteback fullscreen padvertmore frontpage",
          )
        ) {
          found = true;
        }
        if (found) {
          page_render += hi_page[i];
        }
      }
      const invite_thing =
        (await page_render
          .replaceAll(
            "<p>",
            "<p style='color: " +
              (light_dark ? "#ffffff" : "#000000") +
              "; font-size: 40px;'>",
          )
          .replaceAll(
            '<p style="',
            '<p style="color: ' +
              (light_dark ? "#ffffff" : "#000000") +
              "; font-size: 40px;'>",
          )
          .replaceAll(
            "<td>",
            '<td style="color: ' +
              (light_dark ? "#ffffff" : "#000000") +
              '; font-size: 40px;">',
          )
          .replaceAll(
            "<strong>",
            "<strong style='color: " +
              (light_dark ? "#ffffff" : "#000000") +
              "; font-size: 40px;'>",
          )
          .replaceAll(
            "<h4>",
            "<h4 style='color: " +
              (light_dark ? "#ffffff" : "#000000") +
              "; font-size: 60px;'>",
          )
          .replaceAll(
            '<span style="font-size: 14px;">',
            '<span style="color: ' +
              (light_dark ? "#ffffff" : "#000000") +
              '; font-size: 30px;">',
          )) + "\n";

      setInviteData(invite_thing);
      // console.log(page_render);
    };
    hello();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: light_dark ? "rgb(46, 45, 45)" : "#ffffff",
      }}
    >
      {/* <Text style={styles.nombre}>{reference}</Text> */}
      <View style={{ height: 65 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ flexDirection: "row" }}
          style={{ marginTop: 20, height: 0 }}
        >
          <TouchableOpacity
            onPress={invite_load}
            style={[
              styles.topbuttons,
              {
                backgroundColor:
                  page == "invite" ? "rgb(17, 148, 26)" : "rgb(0,0,0)",
                shadowColor: light_dark ? "white" : "black",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 3,
                borderColor: light_dark ? "white" : "black",
                borderWidth: 0.1,
              },
            ]}
          >
            <Text
              style={{
                color: light_dark ? "#ffffff" : "#000000",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              Invite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={entries_load}
            style={[
              styles.topbuttons,
              {
                backgroundColor:
                  page == "entries" ? "rgb(17, 148, 26)" : "rgb(0, 0, 0)",
                shadowColor: light_dark ? "white" : "black",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 3,
                borderColor: light_dark ? "white" : "black",
              },
            ]}
          >
            <Text
              style={{
                color: light_dark ? "#ffffff" : "#000000",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              Entries
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={judges_load}
            style={[
              styles.topbuttons,
              {
                backgroundColor:
                  page == "judges" ? "rgb(17, 148, 26)" : "rgb(0, 0, 0)",
                shadowColor: light_dark ? "white" : "black",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 3,
                borderColor: light_dark ? "white" : "black",
              },
            ]}
          >
            <Text
              style={{
                color: light_dark ? "#ffffff" : "#000000",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              Judges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pairings_load}
            style={[
              styles.topbuttons,
              {
                backgroundColor:
                  page == "pairings" ? "rgb(17, 148, 26)   " : "rgb(0, 0, 0)",
                shadowColor: light_dark ? "white" : "black",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 3,
                borderColor: light_dark ? "white" : "black",
              },
            ]}
          >
            <Text
              style={{
                color: light_dark ? "#ffffff" : "#000000",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              Pairings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={results_load}
            style={[
              styles.topbuttons,
              {
                backgroundColor:
                  page == "results" ? "rgb(17, 148, 26)" : "rgb(0, 0, 0)",
                shadowColor: light_dark ? "white" : "black",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 3,
                borderColor: light_dark ? "white" : "black",
              },
            ]}
          >
            <Text
              style={{
                color: light_dark ? "#ffffff" : "#000000",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              Results
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView>
        {hola.map((item) => {
          if (page == "invite") {
            // console.log("Rendering");
            return (
              <ScrollView key={item} style={{ flex: 1 }}>
                <TouchableOpacity
                  style={[
                    styles.work,
                    {
                      backgroundColor: light_dark ? "rgb(0, 0, 0)" : "white",
                      borderColor: light_dark ? "#404142" : "#e2e8f0",
                      shadowColor: light_dark ? "white" : "black",
                    },
                  ]}
                  onPress={() => {
                    institution_load();
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: light_dark ? "#ffffff" : "#000000",
                        fontSize: 17,
                      }}
                    >
                      Institutions Attending
                    </Text>
                    <AntDesign
                      name="arrow-right"
                      size={20}
                      style={{
                        marginLeft: 15,
                        display: institutions ? "none" : "flex",
                      }}
                      color={light_dark ? "#ffffff" : "#000000"}
                    />
                    <AntDesign
                      name="arrow-down"
                      size={20}
                      style={{
                        marginLeft: 15,
                        display: !institutions ? "none" : "flex",
                      }}
                      color={light_dark ? "#ffffff" : "#000000"}
                    />
                  </View>
                  <Text
                    style={{
                      display: institutions ? "flex" : "none",
                      color: light_dark ? "#ffffff" : "#000000",
                    }}
                  >
                    {institutiondata}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.work,
                    {
                      backgroundColor: light_dark ? "rgb(0, 0, 0)" : "white",
                      borderColor: light_dark ? "#404142" : "#e2e8f0",
                      shadowColor: light_dark ? "white" : "black",
                    },
                  ]}
                  onPress={() => {
                    date_load();
                    setDates(!dates);
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: light_dark ? "#ffffff" : "#000000",
                        fontSize: 17,
                      }}
                    >
                      Dates & Deadlines
                    </Text>
                    <AntDesign
                      style={{
                        marginLeft: 15,
                        display: dates ? "none" : "flex",
                      }}
                      name="arrow-right"
                      size={20}
                      color={light_dark ? "#ffffff" : "#000000"}
                    />
                    <AntDesign
                      style={{
                        marginLeft: 15,
                        display: !dates ? "none" : "flex",
                      }}
                      name="arrow-down"
                      size={20}
                      color={light_dark ? "#ffffff" : "#000000"}
                    />
                  </View>
                  <Text
                    style={{
                      display: dates ? "flex" : "none",
                      color: light_dark ? "#ffffff" : "#000000",
                    }}
                  >
                    {dateinfo}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.work,
                    {
                      backgroundColor: light_dark ? "rgb(0, 0, 0)" : "white",
                      borderColor: light_dark ? "#404142" : "#e2e8f0",
                      shadowColor: light_dark ? "white" : "black",
                    },
                  ]}
                  onPress={() => {
                    load_uplaods();
                    setUploads(!uploads);
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: light_dark ? "#ffffff" : "#000000",
                        fontSize: 17,
                      }}
                    >
                      Pages & Uploads
                    </Text>
                    <AntDesign
                      style={{
                        marginLeft: 15,
                        display: uploads ? "none" : "flex",
                      }}
                      name="arrow-right"
                      size={20}
                      color={light_dark ? "#ffffff" : "#000000"}
                    />
                    <AntDesign
                      style={{
                        marginLeft: 15,
                        display: !uploads ? "none" : "flex",
                      }}
                      name="arrow-down"
                      size={20}
                      color={light_dark ? "#ffffff" : "#000000"}
                    />
                  </View>
                  <View style={{ display: uploads ? "flex" : "none" }}>
                    {uploads_data.map((item) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginTop: 5,
                            backgroundColor: light_dark
                              ? "rgb(122, 126, 15)"
                              : "white",
                            padding: 5,
                          }}
                          onPress={async () => {
                            await Linking.openURL(item.link);
                          }}
                          key={item.name}
                        >
                          <Text
                            style={{
                              color: light_dark ? "#ffffff" : "#000000",
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </TouchableOpacity>

                <AutoHeightWebView
                  source={{ html: invite_data }}
                  style={{
                    width: "90%",
                    backgroundColor: light_dark ? "#343232" : "#ffffff",
                    marginTop: 20,
                    marginLeft: "5%",
                    borderRadius: 10,
                  }}
                  scrollEnabled={false}
                />

                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
              </ScrollView>
            );
          } else if (page == "entries") {
            return (
              <>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  key={item}
                  contentContainerStyle={{ flexDirection: "row" }}
                  style={{
                    marginTop: 10,
                    height: 50,
                    display: noentriesexisty ? "none" : "flex",
                  }}
                >
                  {entries_data.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.linky}
                        style={[
                          styles.topbuttons,
                          {
                            backgroundColor:
                              currevent == item.namey
                                ? "rgb(231, 147, 21)"
                                : "rgb(0, 0, 0)",
                            shadowColor: light_dark ? "white" : "black",
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            elevation: 3,
                            borderColor: light_dark ? "white" : "black",
                          },
                        ]}
                        onPress={() => {
                          setcurrevent(item.namey);
                        }}
                      >
                        <Text style={{ color: light_dark ? "white" : "black" }}>
                          {item.namey}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <ScrollView>
                  <TextInput
                    style={{
                      marginLeft: 20,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: light_dark ? "white" : "black",
                      padding: 10,
                      color: light_dark ? "white" : "black",
                      width: "90%",
                      display: noentriesexisty ? "none" : "flex",
                    }}
                    placeholderTextColor={light_dark ? "white" : "black"}
                    onChangeText={(text) => {
                      // Honestly , i have no idea how to make this more efficient, cuz it legit runs on every character type, USING 700MB OF RAM FOR SMOE REASON **COUGH COUGH, iphones can't run /j
                      setupdate(
                        update.map((item) => {
                          if (
                            item.entry
                              .toLowerCase()
                              .includes(text.toLowerCase())
                          ) {
                            return { ...item, show: true };
                          } else {
                            return { ...item, show: false };
                          }
                        }),
                      );
                    }}
                    placeholder="Search Entries"
                  ></TextInput>
                  {update.map((item) => {
                    if (!item) {
                      return null;
                    } else {
                      const thingy = item.entry?.split(";");
                      return (
                        <TouchableOpacity
                          key={thingy[3]}
                          style={[
                            styles.work,
                            {
                              display: item.show ? "flex" : "none",
                              backgroundColor: light_dark
                                ? "rgb(0, 0, 0)"
                                : "white",
                              borderColor: light_dark ? "#404142" : "#e2e8f0",
                              shadowColor: light_dark ? "white" : "black",
                            },
                          ]}
                        >
                          <Text style={{ color: "green" }}>
                            Institution: {thingy[0]}
                          </Text>
                          <Text
                            style={{ color: light_dark ? "white" : "black" }}
                          >
                            Location: {thingy[1]}
                          </Text>
                          <Text style={{ color: "red" }}>
                            Entry: {thingy[2]}
                          </Text>
                          <Text
                            style={{ color: light_dark ? "white" : "black" }}
                          >
                            Code: {thingy[3]}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
                  <Text
                    style={{
                      fontSize: 20,
                      display: noentriesexisty ? "flex" : "none",
                      color: light_dark ? "white" : "black",
                    }}
                  >
                    No Entries Found; Some tournament may not have released them
                    yet or umm, they just don't show them.
                  </Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                </ScrollView>
              </>
            );
          } else if ("judges" == page) {
            {
              return (
                <>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    key={item}
                    contentContainerStyle={{ flexDirection: "row" }}
                    style={{
                      marginTop: 10,
                      height: 50,
                      display: !judges_page_existe ? "none" : "flex",
                    }}
                  >
                    {judging_data.map((item) => {
                      return (
                        <TouchableOpacity
                          key={item.referency}
                          style={[
                            styles.topbuttons,
                            {
                              alignContent: "center",
                              justifyContent: "center",
                              minWidth: 70,
                              backgroundColor:
                                judge_eventy == item.eventy
                                  ? "rgb(231, 147, 21)"
                                  : "rgb(0, 0, 0)",
                              shadowColor: light_dark ? "white" : "black",
                              shadowOffset: { width: 1, height: 2 },
                              shadowOpacity: 0.8,
                              shadowRadius: 5,
                              elevation: 3,
                              borderColor: light_dark ? "white" : "black",
                            },
                          ]}
                          onPress={() => {
                            setJudgeEventy(item.eventy);
                          }}
                        >
                          <Text
                            style={{
                              // alignItems: "center",
                              // justifyContent: "center",
                              color: light_dark ? "white" : "black",
                              alignSelf: "center",
                            }}
                          >
                            {item.eventy}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                  <TextInput
                    style={{
                      marginLeft: 20,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: light_dark ? "white" : "black",
                      padding: 10,
                      color: light_dark ? "white" : "black",
                      width: "90%",
                      display: !judges_page_existe ? "none" : "flex",
                    }}
                    placeholderTextColor={light_dark ? "white" : "black"}
                    placeholder="Search Judge"
                    onChangeText={(text) => {
                      setJudgePage(
                        judge_page.map((item) => {
                          if (
                            item.info.toLowerCase().includes(text.toLowerCase())
                          ) {
                            return { ...item, show: true };
                          } else {
                            return { ...item, show: false };
                          }
                        }),
                      );
                    }}
                  ></TextInput>
                  <ScrollView>
                    {judge_page.map((item) => {
                      const pwr = item.info.split(";");
                      let details = "";
                      // console.log(pwr);
                      return (
                        <TouchableOpacity
                          key={item.info + ""}
                          style={[
                            styles.work,
                            {
                              display: item.show ? "flex" : "none",
                              backgroundColor: light_dark
                                ? "rgb(0, 0, 0)"
                                : "white",
                              borderColor: light_dark ? "#404142" : "#e2e8f0",
                              shadowColor: light_dark ? "white" : "black",
                            },
                          ]}
                          onPress={() => {
                            setJudgePage((prev) =>
                              prev.map((judge) =>
                                judge.info === item.info
                                  ? { ...judge, expand: !judge.expand }
                                  : judge,
                              ),
                            );
                            if (!item.expand) {
                              run_info_fetch(item.paradime);
                            }
                          }}
                        >
                          {pwr.map((item2) => {
                            // console.log(item2);
                            return (
                              <Text
                                style={{
                                  color:
                                    item2.includes("First") ||
                                    item2.includes("Last")
                                      ? "green"
                                      : item2.includes("Institution")
                                        ? "red"
                                        : light_dark
                                          ? "white"
                                          : "black",
                                }}
                                key={item2 + item.info + ""}
                              >
                                {item2}
                              </Text>
                            );
                          })}
                          <TouchableOpacity
                            style={{
                              alignSelf: "flex-end",
                              display: item.paradime != "" ? "flex" : "none",
                            }}
                            onPress={() => {
                              setJudgePage((prev) =>
                                prev.map((judge) =>
                                  judge.info === item.info
                                    ? { ...judge, expand: !judge.expand }
                                    : judge,
                                ),
                              );
                              if (!item.expand) {
                                run_info_fetch(item.paradime);
                              }
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Text
                                style={{
                                  color: light_dark ? "white" : "black",
                                }}
                              >
                                More Details
                              </Text>
                              <AntDesign
                                style={{
                                  alignContent: "center",
                                  display: !item.expand ? "flex" : "none",
                                  marginTop: 3,
                                }}
                                name="arrow-up"
                                size={15}
                                color="red"
                              />
                              <AntDesign
                                style={{
                                  display: item.expand ? "flex" : "none",
                                  alignContent: "center",
                                  marginTop: 3,
                                }}
                                name="arrow-down"
                                size={15}
                                color="red"
                              />
                            </View>
                          </TouchableOpacity>
                          <AutoHeightWebView
                            style={{
                              display: item.expand ? "flex" : "none",
                              width: "80%",
                            }}
                            source={{
                              //GUESS WHAT, ALL OF THIS IS GENERATED BY JUST PRESSING THE "!", WHO ACTUALLY KNEW THAT
                              html: `
                                <!DOCTYPE html>
                                <html>
                                  <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1">
                                    <style>
                                      html, body {
                                        margin: 0;
                                        padding: 0;
                                      }
                                    </style>
                                  </head>
                                  <body>
                                    ${item.details.replaceAll("<p", "<p style='color: " + (light_dark ? "white" : "black") + ";'")}
                                  </body>
                                </html>
  `,
                            }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                  </ScrollView>
                </>
              );
            }
          } else if (page === "pairings") {
            return (
              <>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  key={item}
                  contentContainerStyle={{ flexDirection: "row" }}
                  style={{
                    marginTop: 10,
                    height: 50,
                    display: !pairing_page_existe ? "none" : "flex",
                  }}
                >
                  {pairing_panel_1.map((thing) => {
                    return (
                      <TouchableOpacity
                        key={thing.nameything}
                        style={[
                          styles.topbuttons,
                          {
                            alignContent: "center",
                            justifyContent: "center",
                            minWidth: 70,
                            backgroundColor:
                              pairing_eventy == thing.nameything
                                ? "rgb(231, 147, 21)"
                                : "rgb(0, 0, 0)",
                            shadowColor: light_dark ? "white" : "black",
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            elevation: 3,
                            borderColor: light_dark ? "white" : "black",
                          },
                        ]}
                        onPress={() => {
                          setpairing_eventy(thing.nameything);
                        }}
                      >
                        <Text style={{ color: light_dark ? "white" : "black" }}>
                          {thing.nameything}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  key={item.namey}
                  contentContainerStyle={{ flexDirection: "row" }}
                  style={{
                    marginTop: 10,
                    height: 50,
                    display: !pairing_page_existe ? "none" : "flex",
                  }}
                >
                  {panel2.map((thing) => {
                    if (pairing_page_existe) {
                      return (
                        <TouchableOpacity
                          key={thing.name}
                          style={[
                            styles.topbuttons,
                            {
                              alignContent: "center",
                              justifyContent: "center",
                              minWidth: 70,
                              backgroundColor:
                                panel2selected == thing.name
                                  ? "rgb(231, 147, 21)"
                                  : "rgb(0, 0, 0)",
                              shadowColor: light_dark ? "white" : "black",
                              shadowOffset: { width: 1, height: 2 },
                              shadowOpacity: 0.8,
                              shadowRadius: 5,
                              elevation: 3,
                              borderColor: light_dark ? "white" : "black",
                            },
                          ]}
                          onPress={() => {
                            setpanel2selected(thing.name);
                          }}
                        >
                          <Text
                            style={{ color: light_dark ? "white" : "black" }}
                          >
                            {thing.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </ScrollView>
                <ScrollView>
                  <TextInput
                    style={{
                      marginLeft: 20,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: light_dark ? "white" : "black",
                      padding: 10,
                      color: light_dark ? "white" : "black",
                      width: "90%",
                      display: !judges_page_existe ? "none" : "flex",
                    }}
                    placeholderTextColor={light_dark ? "white" : "black"}
                    placeholder="Search Pairings"
                    onChangeText={(text) => {
                      const working = pairings_info.map((thingpls) => {
                        const thingmatches = thingpls.some((thingl) => {
                          if (thingl.name) {
                            return thingl?.name
                              .toLowerCase()
                              .includes(text.toLowerCase());
                          } else {
                            return false;
                          }
                        });
                        if (thingmatches) {
                          return [
                            { ...thingpls[0], show: true },
                            ...thingpls.slice(1),
                          ];
                        } else {
                          return [
                            { ...thingpls[0], show: false },
                            ...thingpls.slice(1),
                          ];
                        }
                      });
                      setpairingsinfo(working);
                    }}
                  ></TextInput>
                  {pairings_info.map((item) => {
                    if (item[0] && current_pairing_event == "debate") {
                      return (
                        <TouchableOpacity
                          style={[
                            styles.work,
                            {
                              display: item[0].show ? "flex" : "none",
                              backgroundColor: light_dark
                                ? "rgb(0, 0, 0)"
                                : "white",
                              borderColor: light_dark ? "#404142" : "#e2e8f0",
                              shadowColor: light_dark ? "white" : "black",
                            },
                          ]}
                        >
                          {item.map((item2) => {
                            if (item2.link != "") {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    if (item2.link.includes("/index/tourn")) {
                                      console.log(item2.link);
                                      Linking.openURL(
                                        "https://tabroom.com" + item2.link,
                                      );
                                    } else if (
                                      item2.link.includes("judge.mhtml")
                                    ) {
                                      Linking.openURL(
                                        "https://tabroom.com/index/tourn/postings/" +
                                          item2.link,
                                      );
                                    } else {
                                      console.log(item2.link);
                                      Linking.openURL(item2.link);
                                    }
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: light_dark ? "white" : "black",
                                    }}
                                  >
                                    {item2.name}
                                  </Text>
                                </TouchableOpacity>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    color: light_dark ? "white" : "black",
                                  }}
                                >
                                  {item2.name}
                                </Text>
                              );
                            }
                          })}
                        </TouchableOpacity>
                      );
                    } else if (item[0] && current_pairing_event !== "debate") {
                      return (
                        <TouchableOpacity
                          style={[
                            styles.work,
                            {
                              display: item[0].show ? "flex" : "none",
                              backgroundColor: light_dark
                                ? "rgb(0, 0, 0)"
                                : "white",
                              borderColor: light_dark ? "#404142" : "#5",
                              shadowColor: light_dark ? "white" : "black",
                            },
                          ]}
                        >
                          {item.map((item2) => {
                            console.log(item2.name);
                            if (true) {
                              if (item2.link != "") {
                                return (
                                  <TouchableOpacity
                                    onPress={() => {
                                      if (item2.link.includes("/index/tourn")) {
                                        console.log(item2.link);
                                        Linking.openURL(
                                          "https://tabroom.com" + item2.link,
                                        );
                                      } else if (
                                        item2.link.includes("judge.mhtml")
                                      ) {
                                        Linking.openURL(
                                          "https://tabroom.com/index/tourn/postings/" +
                                            item2.link,
                                        );
                                      } else {
                                        console.log(item2.link);
                                        Linking.openURL(item2.link);
                                      }
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: light_dark ? "white" : "black",
                                      }}
                                    >
                                      {item2.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              } else {
                                return (
                                  <Text
                                    style={{
                                      color: light_dark ? "white" : "black",
                                    }}
                                  >
                                    {item2.name}
                                  </Text>
                                );
                              }
                            }
                          })}
                        </TouchableOpacity>
                      );
                    }
                  })}
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                </ScrollView>
              </>
            );
          }
        })}
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
    borderWidth: 0.1,
    borderRadius: 15,
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
