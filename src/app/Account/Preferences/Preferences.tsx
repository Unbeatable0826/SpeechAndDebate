  import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler} from "react-native";
  import {createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, updatePassword, onAuthStateChanged} from 'firebase/auth'
  import React, {useState, useEffect} from 'react';
  import { app, auth, db } from '../../../../firebaseConfig.js'
  import { useRouter } from "expo-router";
  import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "firebase/firestore";;
  import * as SecureStore from 'expo-secure-store';
  // import { Ionicons } from '@expo/vector-icons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
//Home Featureset
//     
export default function THINGY6() {
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

useEffect(() => {onAuthStateChanged(auth, async(user) => {
        if (user){
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
                if (!pop.includes("<span class=\"threefifths padright\">")){
                    router.replace("/");
                }
                let Last_name = ""                
                let run = 0

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

        </View>
    );
  }

  