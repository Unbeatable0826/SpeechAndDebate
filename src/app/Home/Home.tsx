  import { Text, View, StyleSheet, TextInput, Button, Pressable , Keyboard, TouchableWithoutFeedback, BackHandler} from "react-native";
  import {createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, updatePassword} from 'firebase/auth'
  import React, {useState, useEffect} from 'react';
  import { app, auth, db } from '../../../firebaseConfig.js'
  import { useRouter } from "expo-router";
  import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "firebase/firestore";;
  import * as SecureStore from 'expo-secure-store';
  // import { Ionicons } from '@expo/vector-icons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

  export default function THINGY1() {


    return (
        <View>
            <Text>HELLO</Text>
        </View>
    );
  }