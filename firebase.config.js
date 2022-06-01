import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBAP8nU9hjQTuGqTAL7XNVoL0oQjLhAyhk",
    authDomain: "managementbuild-10cbb.firebaseapp.com",
    projectId: "managementbuild-10cbb",
    storageBucket: "managementbuild-10cbb.appspot.com",
    messagingSenderId: "689121743509",
    appId: "1:689121743509:web:9e47734461ddf7d7b0419c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db





