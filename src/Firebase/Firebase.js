import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQNw2xaA69q1xRzNUabKfjrf2Celw_Tw4",
    authDomain: "nexbuy-922ad.firebaseapp.com",
    databaseURL: "https://nexbuy-922ad-default-rtdb.firebaseio.com",
    projectId: "nexbuy-922ad",
    storageBucket: "nexbuy-922ad.appspot.com",
    messagingSenderId: "525914197842",
    appId: "1:525914197842:web:064628d114572d86eeb48b",
    measurementId: "G-P89GJZHG3Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
