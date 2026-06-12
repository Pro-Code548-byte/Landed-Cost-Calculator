import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBmMgbVoICZPTTVPZzf4UH9-x4ZpkIYnHM',
  authDomain: 'landed-cost-calculator-538c9.firebaseapp.com',
  projectId: 'landed-cost-calculator-538c9',
  storageBucket: 'landed-cost-calculator-538c9.firebasestorage.app',
  messagingSenderId: '874972250312',
  appId: '1:874972250312:web:e99fb53dbb6c7ee218e5fd',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
