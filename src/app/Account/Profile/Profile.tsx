  import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler} from "react-native";
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    export default function THINGY5() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [first, setfirst] = useState('');
    const [last, setlast] = useState('');
    const [middle, setmid] = useState('');
    const [pronouns, setpro] = useState('');
    const [num, setnum] = useState('')
    let bop = "";
    const styles = StyleSheet.create({
        email: {
        width: 300, 
        justifyContent: 'center',
        borderWidth: 1,
        padding: 8, 
        transitionDelay: "0.5s",
        alignItems: "center",
        marginLeft: 40,
        borderRadius: 10,  
        backgroundColor: 'rgb(255, 250, 250)',
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
            justifyContent: 'center',
         
            borderWidth: 1,
            padding: 8, 
            transitionDelay: "0.5s",
            alignItems: "center",
            marginLeft: 40,
            borderRadius: 10,  
            backgroundColor: 'rgb(255, 250, 250)',
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
            justifyContent: 'center',
            borderWidth: 1,
            padding: 8, 
            transitionDelay: "0.5s",
            alignItems: "center",
            marginLeft: 40,
            borderRadius: 10,  
            backgroundColor: 'rgb(255, 250, 250)',
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
            justifyContent: 'center', 
            borderWidth: 1,
            padding: 8, 
            transitionDelay: "0.5s",
            alignItems: "center",
            marginLeft: 40,
            borderRadius: 10,  
            backgroundColor: 'rgb(255, 250, 250)',
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
        justifyContent: 'center',
        borderWidth: 1,
        padding: 8, 
        transitionDelay: "0.5s",
        alignItems: "center",
        marginLeft: 40,
        borderRadius: 10,  
        backgroundColor: 'rgb(255, 250, 250)',
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
        justifyContent: 'center',
        borderWidth: 1,
        padding: 8, 
        transitionDelay: "0.5s",
        alignItems: "center",
        marginLeft: 40,
        borderRadius: 10,  
        backgroundColor: 'rgb(255, 250, 250)',
        fontSize: 17, 
        elevation: 3, 
    }
  });

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
                if (!pop.includes("<span class=\"threefifths padright\">")){
                    router.replace("/");
                }else{
                    const hi = pop.split('\n')
                    let run = 0
                    for (let i = 0; i < hi.length; i++){
                        if (hi[i].includes("<span class=\"threefifths padright\">") ){  
                            let lst = hi[i + 4].trim();
                            const thing = lst.slice(9, lst.length - 1);
                            if (run == 0){
                                console.log(thing)
                                setemail(thing);
                                run++;
                            }
                            else if (run == 1){
                                setfirst(thing);
                                run++;
                            } else if (run == 2){
                                setmid(thing);
                                run++;
                            } else if (run == 3){
                                setlast(thing)
                                run++;
                            } else if (run == 4){
                                setnum(thing)
                                run++;
                            }else if (run == 5) {
                                setpro(thing)
                                run++;

                            }




















                         }}
                }

            } catch (e){
                router.replace("/");
            }
        }else{
            alert("UMM SOMETHING HORRIBLE HAS HAPPENED< ANDDD IT NO GOOD. RESTART APP.")
        }
    })
}, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} bounces={true}>
                <Text style={styles.email_2}>Email: </Text>
                <TextInput style={styles.email} placeholder="Email">{email}</TextInput>
                <Text style={styles.first}>First Name: </Text>
                <TextInput placeholder="First Name" style={styles.first_2}>{first}</TextInput>
                <Text style={styles.mid}>Middle Name: </Text>
                <TextInput style={styles.mid_2} placeholder="Middle Name">{middle}</TextInput>
                <Text style={styles.ln}>Last Name: </Text>
                <TextInput style={styles.ln_2} placeholder="Last Name">{last}</TextInput>
                <Text style={styles.num}>Phone Number: </Text>
                <TextInput style={styles.num_2} placeholder="Phone Number">{num}</TextInput>
                <Text style={styles.pron}>Pronouns: </Text>
                <TextInput style={styles.pron_2} placeholder="Pronouns">{pronouns}</TextInput>
             
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>

    );
  }

