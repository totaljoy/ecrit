import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import SingleShowPage from './pages/SingleShowPage/SingleShowPage.jsx'
import UserNav from './components/UserNav/UserNav.jsx'
import FeedPage from './pages/FeedPage/FeedPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage.jsx'
import SignIn from './components/auth/SignIn/SignIn.jsx'
import AuthDetails from './components/auth/AuthDetails.jsx'
import './App.scss'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthDetails>
    <BrowserRouter>
      {isLoggedIn && <Header />}
      <div className='page'>
      <Routes>
        <Route path='/' element={isLoggedIn ? <FeedPage /> : <SignIn />}/>
        <Route path='/profile/:userId' element={<ProfilePage />} />
        <Route path='/explore' element={<HomePage />}/>
        <Route path='/:exhibitionId' element={<SingleShowPage />}/>
        <Route path='/search' element={<SearchResultsPage />}/>
      </Routes>
      {isLoggedIn && <UserNav />}
      </div>
    </BrowserRouter>
    </AuthDetails>
  )}

export default App
