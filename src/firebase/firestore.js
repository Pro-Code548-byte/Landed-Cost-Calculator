import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from './config.js'

export async function saveTrip(userId, tripData) {
  const tripsRef = collection(db, 'trips')
  return addDoc(tripsRef, {
    userId,
    ...tripData,
    createdAt: new Date().toISOString(),
  })
}

export async function getUserTrips(userId) {
  const tripsRef = collection(db, 'trips')
  const q = query(tripsRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)
  const trips = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return trips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
