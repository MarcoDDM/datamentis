import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import firebase from 'firebase/app';
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBT9Y2ygpEI95377r6HLaNyodkiMeQYn78",
  authDomain: "asyncdata-cba27.firebaseapp.com",
  databaseURL: "https://asyncdata-cba27-default-rtdb.firebaseio.com",
  projectId: "asyncdata-cba27",
  storageBucket: "asyncdata-cba27.appspot.com",
  messagingSenderId: "803950929313",
  appId: "1:803950929313:web:f450d50c57660f7c33d7e0",
  measurementId: "G-SJBBC9M3GF"
};

firebase.initializeApp(firebaseConfig);




ReactDOM.render(<App />, document.getElementById('root'));