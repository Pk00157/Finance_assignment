import { useState } from 'react'

import './App.css'
import LoginPage from './auth/Login'
import AuthPage from './components/AuthPage'
import ProtectedRoute from './utils/ProtectRoute'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
