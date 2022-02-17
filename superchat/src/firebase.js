import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4DLFw2rlq4QuELpdB64FCdIWsTyHAWms",
    authDomain: "superchat-8dbfd.firebaseapp.com",
    projectId: "superchat-8dbfd",
    storageBucket: "superchat-8dbfd.appspot.com",
    messagingSenderId: "346626395621",
    appId: "1:346626395621:web:64ae0b458cc4f6572a330c",
    measurementId: "G-MZ2DG5QBLY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  export const auth = getAuth();
  
  export const db = getFirestore()// documents  from firestore
  // const firestore = 