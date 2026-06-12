import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, signUp, logIn, logOut } from './firebase/auth.js'
import AuthPage from './pages/AuthPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

export default function App() {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      if (initializing) setInitializing(false)
    })
    return unsubscribe
  }, [initializing])

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <AuthPage
        onLogin={logIn}
        onSignup={signUp}
      />
    )
  }

  return (
    <DashboardPage
      user={user}
      onLogout={logOut}
    />
  )
}
