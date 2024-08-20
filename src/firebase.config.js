// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbwiKfZJKP_9zSK6o0cSlp6MdboYGnMYo",
  authDomain: "shyama-dc9e9.firebaseapp.com",
  projectId: "shyama-dc9e9",
  storageBucket: "shyama-dc9e9.appspot.com",
  messagingSenderId: "650601064410",
  appId: "1:650601064410:web:57a249ac13e83ca50d82e3",
  measurementId: "G-5FLTGBHQ3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
