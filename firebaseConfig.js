// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxvf1tDK26vnPZGMtrZr8UkqL6wX-h3yw",
  authDomain: "sih-2023-400407.firebaseapp.com",
  databaseURL: "https://sih-2023-400407-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sih-2023-400407",
  storageBucket: "sih-2023-400407.appspot.com",
  messagingSenderId: "244030468178",
  appId: "1:244030468178:web:2dc60bfba9e3479dcfaf8b",
  measurementId: "G-FGEGVQT27S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);