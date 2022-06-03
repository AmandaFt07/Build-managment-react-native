import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUBwFlC7nrjVaO-lBp-22CfhgWAO3CJlQ",
    authDomain: "buildmanagment-71eae.firebaseapp.com",
    projectId: "buildmanagment-71eae",
    storageBucket: "buildmanagment-71eae.appspot.com",
    messagingSenderId: "862569184032",
    appId: "1:862569184032:web:2ca6127995a32c22367545"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db





