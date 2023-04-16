// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDALwQGYKxOk5XFTLAw2Dhs0MgZ8NT-NU",
    authDomain: "onlinecollege-c53f6.firebaseapp.com",
    projectId: "onlinecollege-c53f6",
    storageBucket: "onlinecollege-c53f6.appspot.com",
    messagingSenderId: "871041762988",
    appId: "1:871041762988:web:438d03cb67d8db2ff1c109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;