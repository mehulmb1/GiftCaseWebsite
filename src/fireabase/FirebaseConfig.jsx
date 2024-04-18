// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDwicwd-pBg6Ueo410abmj7NJgo1ZfYT0Y",
  authDomain: "learning-cd1cd.firebaseapp.com",
  databaseURL: "https://learning-cd1cd-default-rtdb.firebaseio.com",
  projectId: "learning-cd1cd",
  storageBucket: "learning-cd1cd.appspot.com",
  messagingSenderId: "766082072979",
  appId: "1:766082072979:web:0543b8a4f0bc310316a866",
  measurementId: "G-E4G36VP5Y3"
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}