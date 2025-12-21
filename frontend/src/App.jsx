import { useState } from 'react'
import './App.css'
import Navbar from './components/home/Navbar.jsx'
import { Routes,Route } from 'react-router'
import Calendar from './pages/Calendar'
import Profile from './components/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Notes from './pages/Notes'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
      <Route path="/notes" element={<ProtectedRoute><Notes/></ProtectedRoute>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>

    </Routes>
    </>
  )
}

export default App
