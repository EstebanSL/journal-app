import { FirebaseAuth } from "../../firebase/config"
import { EmailAndPasswordSignIn, signInWithGoogle, signUpWithEmailAndPassword } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./AuthSlice"

export const chekingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()
    if (!result.ok) return dispatch( logout(result) )
    
    dispatch(login(result))
  }
}

export const startEmailAndPasswordSignIn = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await EmailAndPasswordSignIn({email, password})
    if (!result.ok) return dispatch( logout(result) )
    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailAndPassword = ({ username, password, email}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signUpWithEmailAndPassword( { username, password, email } )

    console.log(result)

    if (!result.ok) return dispatch(logout(result))

    dispatch(login(result))

  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await FirebaseAuth.signOut()
    dispatch(logout())
  }
}