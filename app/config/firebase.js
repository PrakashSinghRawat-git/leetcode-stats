import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCftCRPQ5eSJ8SEDomtsND2u_oiUpbNthc",
    authDomain: "leetstat-d36c8.firebaseapp.com",
    projectId: "leetstat-d36c8",
    storageBucket: "leetstat-d36c8.appspot.com",
    messagingSenderId: "467297030647",
    appId: "1:467297030647:web:13d16c6fe9acdaf25b9ef2",
    measurementId: "G-MJJ2SYPLSQ",
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

export const db = getFirestore(app);
