import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth } from "../../../../firebaseConfig.js";
// import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from "react-native-element-dropdown";
//Home Featureset
//
export default function THINGY5() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [middle, setmid] = useState("");
  const [pronouns, setpro] = useState("");
  const [timezone, setTimezone] = useState("");
  const [num, setnum] = useState("");
  const [data, setdata] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [country, setcountry] = useState("");

  useEffect(() => {
    const thingpl = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let curr = "";
        // alert(user.uid);
        //LOGGED OUT PREVENTION
        const thingy = await SecureStore.getItemAsync("cookie");
        try {
          //   alert("RUNNING");
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
          } else {
            const hi = pop.split("\n");
            let run = 0;
            let temp_zone = "";
            console.log("GOING");
            for (let i = 0; i < hi.length; i++) {
              if (hi[i].includes('<span class="threefifths padright">')) {
                let lst = hi[i + 4].trim();
                const thing = lst.slice(9, lst.length - 1);
                if (run == 0) {
                  setemail(thing);
                  run++;
                } else if (run == 1) {
                  setfirst(thing);
                  run++;
                } else if (run == 2) {
                  setmid(thing);
                  run++;
                } else if (run == 3) {
                  setlast(thing);
                  run++;
                } else if (run == 4) {
                  setnum(thing);
                  run++;
                } else if (run == 5) {
                  setpro(thing);
                  run++;
                } else if (run == 6) {
                  console.log("RUN");
                  let newData = [];
                  for (let j = i + 1; j < hi.length; j++) {
                    if (
                      hi[j].includes("<option") &&
                      hi[j + 1].includes("value=")
                    ) {
                      const popp = hi[j + 1].trim();
                      const popl = hi[j + 3].trim();
                      console.log(popp.slice(7, popp.length - 1));
                      newData.push({
                        head: false,
                        label: popl.slice(1, popl.length - 9),
                        value: popp.slice(7, popp.length - 1),
                      });
                      if (hi[j + 2].includes("selected")) {
                        curr = popp.slice(7, popp.length - 1);
                      }
                    } else if (hi[j].includes('"threefifths padright"')) {
                      break;
                    }
                  }
                  setdata(newData);
                  setTimezone(curr);
                  run++;
                } else if (run == 7) {
                  setstreet(thing);
                  run++;
                } else if (run == 8) {
                  setcity(thing);
                  run++;
                } else if (run == 9) {
                  let states = [];
                  for (let j = i + 1; j < hi.length; j++) {
                    if (
                      hi[j].includes("<option") &&
                      hi[j + 1].includes("value=")
                    ) {
                      // VALUE GATHERING STUFF, HONESTLY SOO STUPID THE WAY THE HTML IS STRUCTURED
                      const flop = hi[j + 1].trim();
                      const rop = flop.split(">");
                      const re_rop = rop[0].slice(15, rop[0].length - 2);
                      const another = re_rop.replace('"', "");
                      const another_one = another.replace("select", "");
                      // LABEL FETCHING,
                      const lbl = rop[1].slice(0, rop[1].length - 8);
                      const fix = lbl.replace("&amp;", "&");

                      states.push({
                        label: fix,
                        value: another_one,
                      });
                      if (re_rop.includes("select")) {
                        setstate(another_one);
                      }
                    } else if (hi[j].includes('class="threefifths padright')) {
                      break;
                    }
                  }
                  states.push({ value: "", label: "N/A - None" });
                  setstatedata(states);

                  run++;
                }
              }
            }
          }
        } catch (e) {
          console.log(e);
          router.replace("/");
        }
      } else {
        alert(
          "UMM SOMETHING HORRIBLE HAS HAPPENED< ANDDD IT NO GOOD. RESTART APP.",
        );
      }
    });

    return () => thingpl();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={true}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.email_2}>Email: </Text>
      <TextInput
        style={styles.email}
        placeholder="Email"
        value={email}
      ></TextInput>
      <Text style={styles.first}>First Name: </Text>
      <TextInput
        placeholder="First Name"
        value={first}
        style={styles.first_2}
      ></TextInput>
      <Text style={styles.mid}>Middle Name: </Text>
      <TextInput
        style={styles.mid_2}
        placeholder="Middle Name"
        value={middle}
      />
      <Text style={styles.ln}>Last Name: </Text>
      <TextInput style={styles.ln_2} placeholder="Last Name" value={last} />
      <Text style={styles.num}>Phone Number: </Text>
      <TextInput style={styles.num_2} placeholder="Phone Number" value={num} />
      <Text style={styles.pron}>Pronouns: </Text>
      <TextInput
        style={styles.pron_2}
        placeholder="Pronouns"
        value={pronouns}
      />
      <Text style={styles.zone}>TimeZone: </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        autoScroll={false}
        valueField="value"
        placeholder="Select Timezone"
        value={timezone}
        search={true}
        onChange={(item) => {
          if (item.head) {
            return;
          } else {
            setTimezone(item.value);
          }
        }}
      />
      <Text style={styles.street_2}>Street Address: </Text>
      <TextInput
        style={styles.street}
        placeholder="Street"
        value={street}
      ></TextInput>

      <Text style={styles.city}>City: </Text>
      <TextInput
        style={styles.city_2}
        value={city}
        placeholder="City"
      ></TextInput>
      <Text style={styles.state}>State: </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={statedata}
        labelField="label"
        autoScroll={false}
        valueField="value"
        placeholder="Select State"
        value={state}
        onChange={(item) => {
          setstate(item.value);
        }}
        search={true}
      />

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
      <Text></Text>
      <Text></Text>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  email: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  email_2: {
    fontSize: 17,
    marginTop: 5,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  first: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  first_2: {
    width: 300,
    justifyContent: "center",

    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  mid: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  mid_2: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  ln: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  ln_2: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  num: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  num_2: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  pron: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  pron_2: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  street: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  street_2: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  city_2: {
    width: 300,
    justifyContent: "center",
    borderWidth: 1,
    padding: 8,
    transitionDelay: "0.5s",
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    fontSize: 17,
    elevation: 3,
  },
  city: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  state: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  zone: {
    fontSize: 17,
    marginTop: 10,
    padding: 6,
    width: 340,
    marginLeft: 40,
  },
  dropdown: {
    width: 300,
    marginLeft: 40,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgb(255, 250, 250)",
    elevation: 3,
  },
  placeholderStyle: {
    fontSize: 17,
    color: "rgb(100, 100, 100)",
  },
  selectedTextStyle: {
    fontSize: 17,
    color: "black",
    backgroundColor: "rgba(232, 228, 228, 0.72)",
  },
  header_box: {
    backgroundColor: "rgba(232, 228, 228, 0.72)",
    padding: 10,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  header_text: {
    fontSize: 17,
    color: "black",
  },
  normal: {
    padding: 12,
  },
  normal_thing: {
    fontSize: 17,
    color: "black",
    marginLeft: 10,
  },
});
