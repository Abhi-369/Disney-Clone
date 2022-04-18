// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgCt2JIHimsSthNsRsRt3Z4rNkfRF4CTI",
  authDomain: "clone-22504.firebaseapp.com",
  projectId: "clone-22504",
  storageBucket: "clone-22504.appspot.com",
  messagingSenderId: "31332605056",
  appId: "1:31332605056:web:71dbf5bffef4b809965a65",
  measurementId: "G-SRX57KH9EB"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth()
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp)

export { auth, provider, storage };
export default db;