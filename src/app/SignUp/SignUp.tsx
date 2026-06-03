import { Text, View, StyleSheet, TextInput, Button, Pressable } from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import React, {useState, useEffect} from 'react';
import { app, auth, db } from '../../../firebaseConfig.js';



const bop = "Enter your Tabroom credentials";
export default function THINGY1() {
  const [email, setEmail] = useState('');
  const [display, setDisplay] = useState('Welcome !');
  const [style1, setStyle] = useState(styles.first);
  const [style2, setStyle2] = useState(styles.second);
  const [style3, setStyle3] = useState(styles.press);
  const [password, setPas] = useState('');
  const SIGNUP = async () => {
    setStyle3(styles.press);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    alert("IT WORKSSSS FOR GOODNESS SAKE");
  }
  const work = () => {
    setStyle(styles.first2);
  }
  const work2 = () => {
    setStyle2(styles.second2);
  }
  useEffect(() => {
    var index = 0;
    const doe = () => {
      index++;
      setDisplay(bop.slice(0, index));
      if (index < bop.length) {
        setTimeout(doe, 50);
      }
    };
    const pl1 = setTimeout(doe, 250);
    return () => {
      clearTimeout(pl1);
    };
  }, []);

  return (
    <View style={styles.other_thing}>
      <Text style={styles.title}>{display}</Text>
      <TextInput   onPress={work} placeholder="Enter Email" style={style1} value={email} onChangeText={setEmail}></TextInput>
      <TextInput onPress={work2} style={style2} placeholder="Enter Password" value={password} onChangeText={setPas}></TextInput>
    <Pressable style={style3} onPress={SIGNUP}>
      <Text style={styles.t1}>Sign In</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  t1:{
    color: "white",
    fontSize: 15,

  },
  title:{
    marginBottom: 50,
    textAlign: "center",
    fontSize: 48,
    fontFamily: "Petemoss",
    transitionDelay: "0.5s",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transitionDelay: "0.5s",
  },
  other_thing:{
    padding: 20, 
    justifyContent: 'center',
    transitionDelay: "0.5s",

    flex: 1,
  },
  first: {
    marginBottom: 10, 
    borderWidth: 1,
    padding: 8, 
    transitionDelay: "0.5s",
  },
  second: {
    marginBottom: 15,
    borderWidth: 1, 
    padding: 8, 
    transitionDelay: "0.5s",
  },
  press: {
    margin: 2, 
    transitionDelay: "0.5s",
    backgroundColor: "rgb(0, 128, 255)",
    fontSize: 20,
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",  
    color: "white",
  },
  first2: {
    marginBottom: 30, 
    borderWidth: 1,
    padding: 8, 
    transitionDelay: "0.5s",
  },
  second2: {
    marginBottom: 30, 
    borderWidth: 1,
    padding: 8, 
    transitionDelay: "0.5s",
  },
  
});
