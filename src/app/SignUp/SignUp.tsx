import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler} from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import React, {useState, useEffect} from 'react';
import { app, auth, db } from '../../../firebaseConfig.js';
import { Ionicons } from '@expo/vector-icons';


const bop = "Please Enter your  \n Tabroom Credentials";
export default function THINGY1() {
  const[stytitle, setSty] = useState(styles.title);
  const [thingother,setThing] = useState(styles.other_thing);
  const [email, setEmail] = useState('');
  const [display, setDisplay] = useState('Welcome Speech and Debaters !');
  const [style3, setStyle3] = useState(styles.press);
  const [password, setPas] = useState('');
  const [focused1, setFocused1] = useState(false);
  const [style1, setStyle1] = useState(styles.first);
  const [style2, setStyle2] = useState(styles.second);
useEffect(() => {
    const goback = () => {
      if (!focused1) {
        BackHandler.exitApp();
      } else {
        Keyboard.dismiss();
        setFocused1(false);
      }
      return true; 
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goback);
  }, [focused1]);

  useEffect(() => {
    const plswork = Keyboard.addListener(
      'keyboardDidHide',
      () => {Keyboard.dismiss();
        setFocused1(false);}
    );
    return () => {
    };
  }, []);

  const SIGNUP = async () => {
    setStyle3(styles.press);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    alert("IT WORKSSSS FOR GOODNESS SAKE");
  }
  useEffect(() => {
    setTimeout(() =>{
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
    }, 1500);
  }, []);
  const plswork = () => {
    if (focused1) {
      Keyboard.dismiss();
      setFocused1(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={plswork}>
      <View style={[styles.other_thing, focused1 && styles.thingg2]}>
        <Text style={styles.title} >{display}</Text>
        <TextInput   onFocus={() => {setFocused1(true)}} onBlur={() => {setFocused1(false)}} placeholder="Enter Email" style={style1} value={email} onChangeText={setEmail}></TextInput>
        <TextInput onFocus={() => {setFocused1(true)}} onBlur = {() => {setFocused1(false)}} style={style2} placeholder="Enter Password" value={password} onChangeText={setPas} secureTextEntry></TextInput>
      <Pressable style={style3} onPress={SIGNUP}>
        <Text style={styles.t1}>Sign In</Text>
      </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  t1:{
    color: "white",
    fontSize: 15,

  },
  thingg2:{
    padding: 20, 
    justifyContent: 'flex-start',
    transitionDelay: "0.5s",
    flex: 1,
  },
  title2:{
    marginBottom: 50,
    textAlign: "center",
    fontSize: 48,
    fontFamily: "Petemoss",
    transitionDelay: "0.5s",
  },
  title:{
    marginBottom: 50,
    textAlign: "center",
    fontSize: 48,
    fontFamily: "Petemoss",
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
