

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: "AIzaSyDX7tUGQzCKpChOCT_C49dRGg9RSPzfv8w",
  authDomain: "gituser-authentication.firebaseapp.com",
  projectId: "gituser-authentication",
  storageBucket: "gituser-authentication.appspot.com",
  messagingSenderId: "359719792966",
  appId: "1:359719792966:web:4d2b3bf9252841c263f547"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);