import { FirebaseAuth } from "../../firebase/config"
import { EmailAndPasswordSignIn, signInWithGoogle, signUpWithEmailAndPassword } from "../../firebase/providers"
import { clearAllOnLogout } from "../journal"
import { checkingCredentials, login, logout } from "./AuthSlice"

/**
 * [chekingAuthentication]
 * Method that set the status to checking while loading data
 * @returns {void}
 */
export const chekingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

/**
 * [startGoogleSignIn]
 * @description Method that call the actions to sign in with Google and authenticate
 * @returns {void}
 */
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()
    if (!result.ok) return dispatch( logout(result) )
    
    dispatch(login(result))
  }
}

/**
 * [startEmailAndPasswordSignIn]
 * @description Method that call the actions to sign in with email and password credentials and authenticate
 * @returns {void}
 */
export const startEmailAndPasswordSignIn = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await EmailAndPasswordSignIn({email, password})
    if (!result.ok) return dispatch( logout(result) )
    dispatch(login(result))
  }
}

/**
 * [startCreatingUserWithEmailAndPassword]
 * @description Method that call the actions to sign up a user with email and password credentials and authenticate
 * @returns {void}
 */
export const startCreatingUserWithEmailAndPassword = ({ username, password, email}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signUpWithEmailAndPassword( { username, password, email } )

    console.log(result)

    if (!result.ok) return dispatch(logout(result))

    dispatch(login(result))

  }
}

/**
 * [startLogout]
 * @description Method that call the actions to logout a user and clear the session
 * @returns {void}
 */
export const startLogout = () => {
  return async (dispatch) => {
    await FirebaseAuth.signOut()
    dispatch(clearAllOnLogout())
    dispatch(logout())
  }
}