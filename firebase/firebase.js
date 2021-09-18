// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAe1BXfrFgcrTwPY_VUV2oW6L9pKGS86_A",
    authDomain: "facebook-clone-a23e9.firebaseapp.com",
    projectId: "facebook-clone-a23e9",
    storageBucket: "facebook-clone-a23e9.appspot.com",
    messagingSenderId: "492026938114",
    appId: "1:492026938114:web:8153f486a5b6e61f85b81b"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };