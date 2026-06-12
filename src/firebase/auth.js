import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './config.js'

export { auth }

export async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function logOut() {
  return signOut(auth)
}
