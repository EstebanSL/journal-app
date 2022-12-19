import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const GoogleProvider = new GoogleAuthProvider();

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

export const signUpWithEmailAndPassword = async ({ email, password, username }) => {
  try {
    const { displayName, photoURL, uid } = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

    await updateProfile( FirebaseAuth.currentUser, {
      displayName: username
    } )
    
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