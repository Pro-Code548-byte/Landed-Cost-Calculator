import LoginForm from '../components/LoginForm.jsx'

export default function AuthPage({ onLogin, onSignup }) {
  return <LoginForm onLogin={onLogin} onSignup={onSignup} />
}
