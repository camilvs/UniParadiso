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
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password, username) =>{
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // create Firestore profile
  const uid = cred.user.uid;
  const ref = doc(db, "users", uid);
  await setDoc(ref, {
    username,
    level: 1,
    xp: 0,
    wins: 0,
    losses: 0,
    createdAt: serverTimestamp(),
  });

  return cred;
};


export const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

export const doSendEmailVerification = () =>
  sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/login`,
  });
  export const createUserProfile = async (uid, username) => {
  const ref = doc(db, "users", uid);
  await setDoc(ref, {
    username,
    level: 1,
    xp: 0,
    wins: 0,
    losses: 0,
    createdAt: serverTimestamp(),
  });
};
