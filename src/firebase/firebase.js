// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getAuth} from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAszOa_Ovjacm4jdyAwbEBgVhEtSft6c_Q",
//   authDomain: "uniparadiso.firebaseapp.com",
//   projectId: "uniparadiso",
//   storageBucket: "uniparadiso.firebasestorage.app",
//   messagingSenderId: "866621121472",
//   appId: "1:866621121472:web:a0e2f70d0025978e199e25",
//   measurementId: "G-5KRP14522D"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// export {app, auth};

// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAszOa_Ovjacm4jdyAwbEBgVhEtSft6c_Q",
  authDomain: "uniparadiso.firebaseapp.com",
  projectId: "uniparadiso",
  storageBucket: "uniparadiso.firebasestorage.app",
  messagingSenderId: "866621121472",
  appId: "1:866621121472:web:a0e2f70d0025978e199e25",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);