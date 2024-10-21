// Crea un archivo firebase-config.js en tu directorio src/
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQ_Q4CvLPxPwFQap6hpBSx1yB5lE8f6I0",
  authDomain: "negocios-2-10d3a.firebaseapp.com",
  projectId: "negocios-2-10d3a",
  storageBucket: "negocios-2-10d3a.appspot.com",
  messagingSenderId: "668496458721",
  appId: "1:668496458721:web:d155a462cb1611e96d58a0",
  measurementId: "G-WSLQZB37VG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };