// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC12qG4rqyXT_hODsdv7gekVGMarg81Ing",
  authDomain: "shyama-ceramics.firebaseapp.com",
  projectId: "shyama-ceramics",
  storageBucket: "shyama-ceramics.appspot.com",
  messagingSenderId: "138360418638",
  appId: "1:138360418638:web:ca64916bfc32d0ab052e1f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
