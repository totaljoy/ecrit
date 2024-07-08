import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import SingleShowPage from './pages/SingleShowPage/SingleShowPage.jsx'
import UserNav from './components/UserNav/UserNav.jsx'
import FeedPage from './pages/FeedPage/FeedPage.jsx'
import './App.scss'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className='page'>
      <Routes>
        <Route path='/' element={<FeedPage />}/>
        <Route path='/explore' element={<HomePage />}/>
        <Route path='/:exhibitionId' element={<SingleShowPage />}/>
      </Routes>
      <UserNav />
      </div>
    </BrowserRouter>
  )}

export default App
