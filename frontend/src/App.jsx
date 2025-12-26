import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Calendar from './pages/Calendar'
import Tree from './pages/Tree.jsx'
import Profile from './components/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Notes from './pages/Notes'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
function App() {
  useEffect(() => {
    async function fun() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL
          }/api/health`, {
          method: "GET",
          credentials: "include",
        })
        if (!res.ok) alert("Server waking up...")
          else console.log("Server awake!")
      } catch (err) {
        alert("Server waking up...")
      }
    }
    fun()
    

  }, [])


  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/tree" element={<ProtectedRoute><Tree /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </>
  )
}

export default App
