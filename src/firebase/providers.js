import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const GoogleProvider = new GoogleAuthProvider();

/**
 * [signInWithGoogle]
 * @description Method that sign in with Google provider
 * @returns object { ok: boolean, errorMessage: string }
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, GoogleProvider)
    const user = result.user;
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = user

    return {
      ok: true,
      displayName, email, photoURL, uid
    }
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}

/**
 * [signInWithGoogle]
 * @description Method that sign in with email and password credentials
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns object { ok: boolean, errorMessage: string }
 */
export const signUpWithEmailAndPassword = async ({ email, password, username }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid, photoURL } = user
    await updateProfile(FirebaseAuth.currentUser, {
      displayName: username
    })

    return {
      ok: true,
      displayName: username, email, photoURL, uid
    }
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}

/**
 * [signInWithGoogle]
 * @description Method that sign in with email and password credentials
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns object { ok: boolean, errorMessage: string }
 */
export const EmailAndPasswordSignIn = async ({ email: emailAccess, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(FirebaseAuth, emailAccess, password)
    const { displayName, email, photoURL, uid } = user

    return {
      ok: true,
      displayName, email, photoURL, uid
    }
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}