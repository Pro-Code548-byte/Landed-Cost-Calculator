import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import Calculator from '../components/Calculator.jsx'
import SavedHistory from '../components/SavedHistory.jsx'
import { saveTrip, getUserTrips } from '../firebase/firestore.js'

export default function DashboardPage({ user, onLogout }) {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTrips = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserTrips(user.uid)
      setTrips(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user.uid])

  useEffect(() => {
    loadTrips()
  }, [loadTrips])

  async function handleSaveTrip(tripData) {
    await saveTrip(user.uid, tripData)
    await loadTrips()
  }

  return (
    <>
      <Navbar userEmail={user.email} onLogout={onLogout} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Calculator onSaveTrip={handleSaveTrip} />
        </div>
        <SavedHistory
          trips={trips}
          loading={loading}
          error={error}
          onRefresh={loadTrips}
        />
      </main>
    </>
  )
}
