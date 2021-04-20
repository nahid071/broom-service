import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDEom83FfNSLmtzy0u2hrliwjQCWWifBYc",
  authDomain: "bbsamity.firebaseapp.com",
  projectId: "bbsamity",
  storageBucket: "bbsamity.appspot.com",
  messagingSenderId: "114426697691",
  appId: "1:114426697691:web:e7fdcee4c9e13744f1f9fe",
  measurementId: "G-G6B5ZRKWJK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

import("firebase/firestore");
import("firebase/storage");
import("firebase/auth");

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, storage, firebase, auth };
