import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCp9sIZNcVpxj6tBUVi51ubJjEmEZUcZ2I",
    authDomain: "unichat-ee9da.firebaseapp.com",
    projectId: "unichat-ee9da",
    storageBucket: "unichat-ee9da.appspot.com",
    messagingSenderId: "890983929916",
    appId: "1:890983929916:web:f946b7f5ab42a035d64b39"
}).auth();