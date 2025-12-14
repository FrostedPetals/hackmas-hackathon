import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router'
import Calendar from './pages/Calendar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<Home />} />
      <Route path="calendar" element={<Calendar/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="login" element={<Login/>}/>

    </Routes>
    </>
  )
}

export default App
