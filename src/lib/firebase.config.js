// throw new Error("Replace src/app/lib/firebase.config.js with your own config");

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   // ...
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgw1Mtu0GzFvuKbAwTo2nDVlTsQmnW30I",
  authDomain: "friendly-conference.firebaseapp.com",
  projectId: "friendly-conference",
  storageBucket: "friendly-conference.firebasestorage.app",
  messagingSenderId: "525300004742",
  appId: "1:525300004742:web:801cf6ee3ef4e1a2e8de07",
  measurementId: "G-BFCEPBK2JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
