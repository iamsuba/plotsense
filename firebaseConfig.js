// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your actual Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyDAGo-9qamSn76Msz2_IZtmd2bWrjOo7sA",
    authDomain: "plotsense-ai.firebaseapp.com",
    projectId: "plotsense-ai",
    storageBucket: "plotsense-ai.appspot.com",
    messagingSenderId: "621219071326",
    appId: "1:621219071326:web:4975d8f294948fd54e7bcf",
    measurementId: "G-ZSM2B0QCE7"
  };
  

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
