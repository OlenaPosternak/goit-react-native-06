import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTUr8hXNjrxxY_TG4m71JOKkkmlbJW0vI",
  authDomain: "travel-app-51b51.firebaseapp.com",
  projectId: "travel-app-51b51",
  storageBucket: "travel-app-51b51.appspot.com",
  messagingSenderId: "880440389411",
  appId: "1:880440389411:web:fdeaadda1223ae5a0e2696",
  measurementId: "G-WHMW1MMCPX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

export const db = getFirestore(app);
