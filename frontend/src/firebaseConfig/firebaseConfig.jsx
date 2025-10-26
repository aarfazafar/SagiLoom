// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBzoA9pDgETGSGfpqaW0MJM7fXVByEn7Vk",
  authDomain: "sagiloom.firebaseapp.com",
  projectId: "sagiloom",
  storageBucket: "sagiloom.firebasestorage.app",
  messagingSenderId: "658503170468",
  appId: "1:658503170468:web:f229097a5f609546cfa931",
  measurementId: "G-DDCDZ9NY4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const imageStorage = getStorage(app); 
export {fireDB, auth, imageStorage}