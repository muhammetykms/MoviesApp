import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCyJakMMiEiKwFVwUHSGzGIM8oDNaF3d4M",
  authDomain: "repicemagic.firebaseapp.com",
  projectId: "repicemagic",
  storageBucket: "repicemagic.appspot.com",
  messagingSenderId: "545524448774",
  appId: "1:545524448774:web:aed3afd860178d20dc8d87"
};

  

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // db yerine firestore kullanılmalı
const auth = getAuth(app);

export { firestore, auth }; 
