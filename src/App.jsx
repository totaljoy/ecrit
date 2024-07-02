import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import './App.scss'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className='page'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
      </div>
    </BrowserRouter>
  )}

export default App
