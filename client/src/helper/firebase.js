import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDAJThdqguOg1hEoD23nOUgGYXkC3Rdjw0",
  authDomain: "admin-broom-service.firebaseapp.com",
  projectId: "admin-broom-service",
  storageBucket: "admin-broom-service.appspot.com",
  messagingSenderId: "40558494877",
  appId: "1:40558494877:web:cb66bbe226cbbce062c074",
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
