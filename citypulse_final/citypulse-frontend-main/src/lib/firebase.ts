// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
//   appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your-app-id',
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = 
{
  apiKey: "AIzaSyA6pk41uTCUXuttuvMni6ff6L5_DE-8nMg",
  authDomain: "cityfire-2e8c6.firebaseapp.com",
  projectId: "cityfire-2e8c6",
  storageBucket: "cityfire-2e8c6.firebasestorage.app",
  messagingSenderId: "547527154590",
  appId: "1:547527154590:web:8a62330cf7ba34648c148f"
};
 

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
