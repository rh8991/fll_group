import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// TO SET UP:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Click on "Web" icon to add a web app
// 4. Copy your config values below
// 5. In Firebase Console, go to "Firestore Database" and click "Create Database"
// 6. Choose "Start in test mode" for now (we'll add security rules later)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
