  import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler} from "react-native";
  import {createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, updatePassword, onAuthStateChanged} from 'firebase/auth'
  import React, {useState, useEffect} from 'react';
  import { app, auth, db } from '../../../firebaseConfig.js'
  import { useRouter } from "expo-router";
  import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "firebase/firestore";;
  import * as SecureStore from 'expo-secure-store';
  // import { Ionicons } from '@expo/vector-icons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
  import NavBar from '../NavBar';
//Home Featureset
//     
    export default function THINGY2() {
    const router = useRouter();
    const [name, setName] = useState('');
    let bop = "";
    const styles = StyleSheet.create({
    nombre: {
        fontSize: 50,
        marginTop: 10, 
        fontFamily: "Petemoss",
    }
  });
 useEffect(() => {
      const goback = () => {
        router.back();
        return true; 
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', goback);
    }, []);
    
useEffect(() => {onAuthStateChanged(auth, async(user) => {
        if (user){
            // alert(user.uid);
            //LOGGED OUT PREVENTION
            const thingy = await SecureStore.getItemAsync('cookie');
            try{
                let header = {
                'Host': 'www.tabroom.com',
                'Cookie': thingy ,
                'Sec-Ch-Ua': '"Not-A.Brand";v="24", "Chromium";v="146"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Accept-Language': 'en-US,en;q=0.9',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-User': '?1',
                'Sec-Fetch-Dest': 'document',
                'Referer': 'https://www.tabroom.com/user/student/index.mhtml?err=&msg=',
                'Priority': 'u=0, i'
                }
                const request = await fetch('https://www.tabroom.com/user/login/profile.mhtml', {method: "GET", headers: header, redirect: 'follow'})
                const pop = await request.text();
                const hi = pop.split('\n')
                // console.log(hi);
                let Last_name = ""                
                let run = 0
                // // hi.forEach(item => {
                // //     if (item.includes("<span class=\"threefifths padright\">") && run === 4){
                        
                // //         run++;
                // //     }else if(item.includes("<span class=\"threefifths padright\">")){
                // //         run++;
                // //     }
                // // })
                // for (let i = 0; i < hi.length; i++){
                //     if (hi[i].includes("<span class=\"threefifths padright\">") && run == 3){
                //         let lst = hi[i + 4].trim();
                //         Last_name = lst.slice(9, lst.length - 1);
                //         bop = "  Welcome Mr. " + Last_name + " !";
                //             setTimeout(() =>{
                //             var index = 0;
                //             const doe = () => {
                //                 index++;
                //                 setName(bop.slice(0, index));
                //                 if (index < bop.length) {
                //                 setTimeout(doe, 50);
                //                 }
                //             };

                //             const pl1 = setTimeout(doe, 250);
                //             return () => {
                //                 clearTimeout(pl1);
                //             };
                //             }, 1500); 

                //         console.log(Last_name);
                //         break;
                //     }else if (hi[i].includes("<span class=\"threefifths padright\">")){
                //         run++
                //     }
                // }

            } catch (e){
                router.replace("/");
            }
        }else{
            alert("UMM SOMETHING HORRIBLE HAS HAPPENED< ANDDD IT NO GOOD. RESTART APP.")
        }
    })
}, []);
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.nombre}>HOLAAAA</Text>
            <NavBar />
        </View>
    );
  }
