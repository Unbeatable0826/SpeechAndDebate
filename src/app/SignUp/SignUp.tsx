  import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler} from "react-native";
  import {createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, updatePassword} from 'firebase/auth'
  import React, {useState, useEffect} from 'react';
  import styled from 'styled-components';
  import { app, auth, db } from '../../../firebaseConfig.js'
  import Loader from '../Loading.js'
  import { useRouter } from "expo-router";
  import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "firebase/firestore";;
  import * as SecureStore from 'expo-secure-store';
  // import { Ionicons } from '@expo/vector-icons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const bop = "Please Enter your  \n Tabroom Credentials";
  export default function THINGY1() {
    const router = useRouter();
    let tried = false;
    const[stytitle, setSty] = useState(styles.title);
    const [thingother,setThing] = useState(styles.other_thing);
    const [email, setEmail] = useState('');
    const [display, setDisplay] = useState('Welcome Speech and Debaters !');
    const [password, setPas] = useState('');
    const [focused1, setFocused1] = useState(false);
    const [style1, setStyle1] = useState(styles.first);
    const [style2, setStyle2] = useState(styles.second);
    const [buttton, setbuttton] = useState(false);
    const [loading, setloading] = useState(false);
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
    useEffect(() => {
        let stuff_does_not_work = false; 
        const check = async () => {
        try{
          const ewail = await SecureStore.getItemAsync('email');
          const paword = await SecureStore.getItemAsync('password');
          if (typeof ewail == 'string' && typeof paword == 'string' && tried == false) {
              let gop = new URLSearchParams();
              gop.append("username", ewail || '');
              const headear = {
              'Host': 'www.tabroom.com',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cache-Control': 'max-age=0',
              'Origin': 'https://www.tabroom.com',
              'Referer': 'https://www.tabroom.com/index/index.mhtml',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,applicati  on/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
              };

              const request = await fetch("https://www.tabroom.com/user/login/login_save.mhtml", {method: "POST", headers: headear, body: gop.toString(), redirect: 'manual'})
              const head =  Object.fromEntries(request.headers.entries());
              console.log(head['set-cookie']);
              try{
              if (head['set-cookie'].split(';')[4].split(",")[1].includes("TabroomToken=%24")) {
                try{
                  await signInWithEmailAndPassword(auth, ewail, paword);
                  router.replace("../Home/Home");

                }catch(e){

                }

                  tried = true;
                }else{
                  stuff_does_not_work = true;
                }
              }catch (e) {
                return;
              }
        }
        } catch (e) {
          tried == true
        }
        if (stuff_does_not_work == true && !tried) {
          alert("User ID and Password Changed, Please Sign In Again");
          await AsyncStorage.removeItem('cookie');
          tried = true;
        }
      }
      check();
      tried = true;
    }, [])



    const textt = useAnimatedStyle(() => {
      return {
        color: withTiming(buttton ? '#0080ff' : '#ffffff', {duration: 200}),
      };
    });
      const tingy = useAnimatedStyle(() => {
        return {
        backgroundColor: withTiming(buttton ? '#ffffff' : '#0080ff', {duration: 200}),
        borderRadius: withTiming(buttton ? 8 : 16, {duration: 400}),
        borderWidth: withTiming(buttton ? 2 : 0, {duration: 400}),
        borderColor: '#0080ff',
        transform: [
          { scale: withTiming(buttton ? 0.95 : 1, {duration: 400}) }
        ]
      };
      });
    const SIGNUP = async () => {
      setbuttton(true);
      setloading(true);
      let logged_in = false; 
      if (email !== '' && password !== '' && email.includes("@") ) {
        let gop = new URLSearchParams();
        gop.append("username", email);
        gop.append("password", password);
        const headear = {
        'Host': 'www.tabroom.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'max-age=0',
        'Origin': 'https://www.tabroom.com',
        'Referer': 'https://www.tabroom.com/index/index.mhtml',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,applicati  on/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        };
        const request = await fetch("https://www.tabroom.com/user/login/login_save.mhtml", {method: "POST", headers: headear, body: gop.toString(), redirect: 'manual'})
        const head = Object.fromEntries(request.headers.entries());
        console.log(head['set-cookie']);
        try{
        if (head['set-cookie'].split(';')[4].split(",")[1].includes("TabroomToken=%24")) {
          logged_in = true;
          const cookie = request.headers.get('set-cookie')?.split(';')[4].split(",")[1] 
          await SecureStore.setItemAsync('cookie',cookie || '');
          }
        }catch (e) {
          alert("Failed, your credentials are a littleeeee screwed up, try again");
        }
      }else {
        if (email === '' || password === '') {
          alert("Please fill in all fields");
        } else if (!email.includes("@")) {
          alert("Please enter a valid email address");
        }
      } 
      let New_person = true;
      // NEW USER CHECKER
      let users = await getDocs(collection(db, "users"))
      let old_user_uid = "";
      users.forEach((thing) => {
        if (thing.data().email == email){
          New_person = false
          old_user_uid = "" + thing.data().uid;
        }
      })
      if (!New_person && logged_in){
        let response = await fetch("https://us-central1-sandd-1304d.cloudfunctions.net/updatepassword_login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          
          body: JSON.stringify({
            'uid': "" + old_user_uid,
            'new_password': "" + password,
          }) // THIS THINGY SHOULD WORK
        });
        const response_now = await response.text()
        let thingy_works = false;
        if (response_now.includes("IT wORKED")){
            thingy_works = true; 
        }
        if (!thingy_works){
          alert("something didn't work out for some reason, sooo umm idk, redo it");
          alert(response_now)
        }else{
        await SecureStore.setItemAsync('email', email );
        await SecureStore.setItemAsync('password', password);
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("../Home/Home");
        }
      }
      if (New_person && logged_in){
        await SecureStore.setItemAsync('email', email );
        await SecureStore.setItemAsync('password', password);
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), { email: email, Skin: "light", uid: cred.user.uid});
        router.replace("../Home/Home");
      }
      setloading(false);
      setbuttton(false);

    }
    useEffect(() => {
      tried = false;
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
            {loading ? (
          <Loader />
        ) : (
        <View style={[styles.other_thing, focused1 && styles.thingg2]}>
          <Text style={styles.title} >{display}</Text>
          <TextInput onFocus={() => {setFocused1(true)}} onBlur={() => {setFocused1(false)}} placeholder="Enter Email" style={[styles.first, focused1 && styles.first2]} value={email} onChangeText={setEmail} />
          <TextInput onFocus={() => {setFocused1(true)}} onBlur={() => {setFocused1(false)}} placeholder="Enter Password" style={[styles.second, focused1 && styles.second2]} value={password} onChangeText={setPas} secureTextEntry />
          <AnimatedPressable style={[styles.press, tingy]} onPress={SIGNUP}>
            <Animated.Text style={[styles.t1, textt]}>Sign In</Animated.Text>
          </AnimatedPressable>
        </View>
        )}

      </TouchableWithoutFeedback>
    );
  }


  const styles = StyleSheet.create({
    // loading_style: {
    // },
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