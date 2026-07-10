import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const NAV_THINGY = [
  // { name: "Home", icon: "home", place: "/Home/Home" },
  { name: "Tourneys", icon: "trophy", place: "/Tourneys/Tourneys" },
  { name: "Results", icon: "book", place: "/Speechdrop/Speechdrop" },
  { name: "Messages", icon: "chatbubbles", place: "/Messages/Messages" },
  { name: "Account", icon: "person", place: "/Account/Account" },
] as const;

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [light_dark, setld] = useState(false);

  useEffect(() => {
    const working = async () => {
      const temp = await AsyncStorage.getItem("theme");
      const temp_2 = temp == "light" ? false : true;
      setld(temp_2);
    };
    working();
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: light_dark ? "rgb(46, 45, 45)" : "white",
        },
      ]}
    >
      {NAV_THINGY.map((thing) => {
        const isActive =
          pathname.includes(thing.place) || pathname.includes(thing.name);
        let coloor = "#8E8E93";
        let nameee = "" + thing.icon + "-outline";
        if (isActive) {
          coloor = "#0080ff";
          nameee = thing.icon;
        } else {
          coloor = light_dark ? "#ffffff" : "#8E8E93";
        }

        return (
          <Pressable
            key={thing.name}
            style={styles.navItem}
            onPress={() => router.navigate(thing.place)}
          >
            <Ionicons
              name={nameee}
              size={24}
              color={coloor}
              style={styles.icon}
            />
            <Text style={[styles.navText, isActive && styles.peep]}>
              {thing.name}
            </Text>
            {isActive && <View style={styles.isup} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  icon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    color: "#8E8E93",
    fontWeight: "500",
  },
  peep: {
    color: "#0080ff",
    fontWeight: "bold",
  },
  isup: {
    width: 4,
    height: 4,
    backgroundColor: "#0080ff",
    borderRadius: 5,
    marginTop: 4,
  },
});
