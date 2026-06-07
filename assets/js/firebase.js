import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbx6egnbiYf-NrcDeA4vUspfiSh0tilXU",
  authDomain: "liseko-36512.firebaseapp.com",
  projectId: "liseko-36512",
  storageBucket: "liseko-36512.firebasestorage.app",
  messagingSenderId: "1089507183630",
  appId: "1:1089507183630:web:4b9707be37b15fdc60805f",
  measurementId: "G-73ZWS94DR3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

console.log("Firebase connecté");