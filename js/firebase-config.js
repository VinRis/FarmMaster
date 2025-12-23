import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  // PASTE YOUR CONFIG OBJECT HERE
  apiKey: "AIzaSyAva7tu7mWrdgJswDIR0W9OWv8ctZ5phPk",
  authDomain: "farmtrack-b470e.firebaseapp.com",
  projectId: "farmtrack-b470e",
  storageBucket: "farmtrack-b470e.firebasestorage.app",
  messagingSenderId: "572276398926",
  appId: "1:572276398926:web:4b39dc570ce2077fae5c1f",
  measurementId: "G-8TLCQ93SR2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
