  import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler, Linking, TouchableOpacity} from "react-native";
  import {createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, updatePassword, onAuthStateChanged, signOut } from 'firebase/auth'
  import React, {useState, useEffect} from 'react';
  import { app, auth, db } from '../../../firebaseConfig.js'
  import { useRouter } from "expo-router";
  import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "firebase/firestore";;
  import * as SecureStore from 'expo-secure-store';
  import { Ionicons } from '@expo/vector-icons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
  import NavBar from '../NavBar';
//PREFERENCES
//LOG OUT
// UPDATES --> BACKGROUND
//PREVIOUS RESULTS

    export default function THINGY2() {
    const[pts, setpts] = useState(0)
    const router = useRouter();
    const [name, setName] = useState('');
    let bop = "";
    const styles = StyleSheet.create({
    nsd: {
        marginTop: 10, 
        fontSize: 17, 
        padding: 6, 
        width: 340, 
        marginLeft: 20,
        height: 40, 
        borderRadius: 10,
        backgroundColor: 'white', 
        borderWidth: 1,
        borderColor: '#e2e8f0', 
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    sec: {
        color: 'blue',
    },
    logout: {
        marginTop: 10, 
        fontSize: 17, 
        padding: 6, 
        // borderWidth: 1,
        width: 340, 
        marginLeft: 20,
        height: 40, 
        borderRadius: 10,
        backgroundColor: 'white', 
        borderWidth: 1,
        borderColor: '#e2e8f0', 
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    logpout: {
        fontSize: 17, 
    },
    profile: {
        marginTop: 10, 
        fontSize: 17, 
        padding: 6, 
        // borderWidth: 1,
        width: 340, 
        marginLeft: 20,
        height: 40, 
        borderRadius: 10,
        backgroundColor: 'white', 
        borderWidth: 1,
        borderColor: '#e2e8f0', 
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,

    },
    profile_2: {
        fontSize: 17, 
    },
    fir: {
        fontSize: 17, 
    },
    set: {
        marginTop: 10, 
        fontSize: 17, 
        padding: 6, 
        // borderWidth: 1,
        width: 340, 
        marginLeft: 20,
        height: 40, 
        borderRadius: 10,
        backgroundColor: 'white', 
        borderWidth: 1,
        borderColor: '#e2e8f0', 
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,

    },
    set_2: {
        fontSize: 17, 
    }

  });

 useEffect(() => {
      const goback = () => {
        router.back();
        return true; 
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', goback);
    }, []);

useEffect(() => {
    const FETCH_NSDA = async () => {
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
                'Referer': 'https://www.tabroom.com/user/student/nsda.mhtml',
                'Priority': 'u=0, i'
                };
        const request = await fetch('https://www.tabroom.com/user/student/nsda.mhtml?update_nsda=1', {method: "GET", headers: header, redirect: 'follow'})
        const hello = await request.text();
        const hi = hello.split("\n")
        
        for (var i = 0; i < hi.length; i++){
            if (hi[i].includes("class=\"full padvertless\"") && hi[i+1].includes("merit points")){
                const ptsd = hi[i+1].split(" ")[0]
                setpts(parseInt(ptsd, 10));
                console.log(hi[i+1]);
            }
        }
    } catch(e){
        alert("COOKIE FETCHING FAILED, SIGN IN AGAIN")
    }

    }
    FETCH_NSDA();

}, [])

const distinction_redirect = async() => {
    await Linking.openURL('https://www.speechanddebate.org/honor-society/');
}
const Logout = async() => {
    await signOut(auth);
    SecureStore.deleteItemAsync('cookie');
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('password');
    router.replace("/");

}

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
                }
                const hi = pop.split('\n')

                let Last_name = ""                
                let run = 0
            } catch (e){
                router.replace("/");
            }
        }else{

        }
    })
}, []);
const moveprofile = async() => {
    router.navigate('/Account/Profile/Profile')

}
const movePreferences = async() => {
    router.navigate('/Account/Preferences/Preferences')
}

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.nsd}><Text style={styles.fir}>NSDA Points:                                           <Text style={styles.sec} onPress={distinction_redirect}>{pts}</Text></Text></TouchableOpacity>
            <TouchableOpacity onPress={moveprofile}style={styles.profile}><Text style={styles.profile_2}>Profile</Text></TouchableOpacity>
            <TouchableOpacity onPress={movePreferences} style={styles.set}><Text style={styles.set_2}>Preferences</Text></TouchableOpacity>

            <TouchableOpacity  onPress={Logout} style={styles.logout}><Text style={styles.logpout}>Logout                                                      <Ionicons name="log-out-outline" size={24} color="#FF3B30" /> </Text></TouchableOpacity>

            <NavBar />
        </View>
    );
  }
