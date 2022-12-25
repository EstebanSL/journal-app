import { onAuthStateChanged } from "@firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"
import { startGetNotesList } from "../store/journal"

export const useCheckAuth = () => {

 
  /** 
   * Variables that stores the status and errorMessage from the app state
   */
  const { status } = useSelector((state) => state.auth)

   /**
   * Redux variable to dispatch actions
   */
  const dispatch = useDispatch()

  useEffect(() => {

    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())

      const { uid, displayName, email, photoURL } = user
      dispatch(login({ uid, displayName, email, photoURL }))
      dispatch( startGetNotesList())
    })


  }, [status])

  return status

}