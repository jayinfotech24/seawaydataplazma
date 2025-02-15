// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0bUaKQSXrxDvLQ47SbuKHVJhejCAPxs0",
    authDomain: "seawayelectrotech-85c5e.firebaseapp.com",
    projectId: "seawayelectrotech-85c5e",
    storageBucket: "seawayelectrotech-85c5e.firebasestorage.app",
    messagingSenderId: "83716150375",
    appId: "1:83716150375:web:ee502bab1b0b2ea3fdb0c2",
    measurementId: "G-BLSW6BQMXL"
};

const fapp = initializeApp(firebaseConfig);
// Initialize Firebase
export default fapp;