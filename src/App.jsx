import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import SingleShowPage from './pages/SingleShowPage/SingleShowPage.jsx'
import Profile from './components/Profile/Profile'
import './App.scss'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className='page'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/:exhibitionId' element={<SingleShowPage />}/>
      </Routes>
      <Profile />
      </div>
    </BrowserRouter>
  )}

export default App
