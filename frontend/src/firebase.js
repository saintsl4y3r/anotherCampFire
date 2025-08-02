import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8RibVR5EkkvsWzsTYHDZ82aAt9H_9eHw",
  authDomain: "campfire-550da.firebaseapp.com",
  projectId: "campfire-550da",
  storageBucket: "campfire-550da.appspot.com",
  messagingSenderId: "468799335337",
  appId: "1:468799335337:web:9a9d3b9c5b8a520f0932b8",
  measurementId: "G-8EQCVE914Y"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Khởi tạo Auth
const auth = getAuth(app);

// Khởi tạo Firestore
const db = getFirestore(app);

export { auth, db };