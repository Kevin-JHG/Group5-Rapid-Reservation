import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './navigation/NavLayout';
import Home from './navigation/Home';
import Contact from './navigation/Contact';
import Login from './navigation/Login';
import Register from './navigation/Register';
import Menu from './navigation/Menu';
import Reservations from './navigation/Reservations';
import UserProfile from './navigation/EditUserInfo';
import NoPage from './navigation/NoPage';
import './App.css'

function App() {
  return (
    <>
      <div className="banner">
        <h1>RAPID RESERVATION</h1>
      </div>
      
      <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='menu' element={<Menu />} />
            <Route path='reservations' element={<Reservations />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
