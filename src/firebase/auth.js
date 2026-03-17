// import {auth} from "./firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async(email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
// };

// export const doSignInWithEmailAndPassword = async(email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// }

// export const doSignOut = async() => {
//     return auth.signOut();
// }

// //password reset
// export const doPasswordReset = async(email) => {
//     return sendPasswordResetEmail(auth,email);
// };

// //password change
// export const doPasswordUpdate = async(password) => {
//     return auth.currentUser.updatePassword(password);
// };

// //email verification
// export const doSendEmailVerification = async() => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/login`,
//     });
// }

// src/firebase/auth.js
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

export const doSendEmailVerification = () =>
  sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/login`,
  });