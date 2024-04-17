import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Add this import for authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2HeYUs8_beHba-baTsUV60gJnrRt9P6w",
  authDomain: "masomoguide-c778c.firebaseapp.com",
  projectId: "masomoguide-c778c",
  storageBucket: "masomoguide-c778c.appspot.com",
  messagingSenderId: "470831703896",
  appId: "1:470831703896:web:66f6dffae69f67b35a672d",
  measurementId: "G-LSCCC8D5NF"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); // Initialize storage
const auth = getAuth(firebaseApp); // Initialize authentication

export { firebaseApp, db, storage, auth };
