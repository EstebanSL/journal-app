import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { filesUpload } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, updateNoteById } from "./journalSlice";


export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch( savingNewNote())
    const { uid } = getState().auth;
    console.log(uid)
    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    }
    const newDoc = doc( collection (FirebaseDB, `/${uid}/journal/notes`));
    await setDoc(newDoc, newNote );

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote( newNote ))
    dispatch (setActiveNote( newNote ))
  }
}

export const startGetNotesList = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid ) throw new Error('No user recognized');
    const collectionRef = collection (FirebaseDB, `/${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = []
    docs.forEach(doc => {
      notes.push({...doc.data(), id: doc.id})
    })

    dispatch( setNotes(notes))

  }
}

export const startSaveNewNote = () => {
  return async (dispatch, getState) => {
    dispatch( savingNewNote())

    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteToSave = {...activeNote}
    delete noteToSave['id']

    console.log(noteToSave)
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)

    await setDoc(docRef, noteToSave, {merge: true})

    dispatch( updateNoteById(activeNote))

  }
}

  export const startUploadingImages = ( files = []) => {
    return async ( dispatch ) => {
      dispatch(savingNewNote());

      const filesPromisesArray = []
      console.log(files)
      for (const file of files) {
          filesPromisesArray.push(filesUpload(file))
      }
      const photosURL = await Promise.all( filesPromisesArray )

      dispatch( setPhotosToActiveNote (photosURL))
    }
  }

  export const startDeleteNoteById = () => {
    return async ( dispatch, getState ) => {
      dispatch(savingNewNote())

      const { uid } = getState().auth
      const { activeNote } = getState().journal;

      const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)

      await deleteDoc( noteRef)

      dispatch( deleteNoteById(activeNote.id))
    }
  }