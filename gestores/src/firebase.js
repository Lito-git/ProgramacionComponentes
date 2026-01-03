import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAW_98javfTJVOKpYvvWsWv1B5Av1m4lhs",
    authDomain: "gestores-react.firebaseapp.com",
    projectId: "gestores-react",
    storageBucket: "gestores-react.firebasestorage.app",
    messagingSenderId: "709007882692",
    appId: "1:709007882692:web:fb432c3da03530c9a8cc91"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);