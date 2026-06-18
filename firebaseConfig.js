import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, initializeFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDixpMiL94y3ir1K_OFHbHKYMECCvW4JLw",
  authDomain: "sandd-1304d.firebaseapp.com",
  projectId: "sandd-1304d",
  storageBucket: "sandd-1304d.firebasestorage.app",
  messagingSenderId: "528994558624",
  appId: "1:528994558624:web:7255087d210b7c805c1fc5",
  measurementId: "G-WYLSM3P8F9"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage),});
const db = initializeFirestore(app, {}, "default");
export {app, auth, db} 