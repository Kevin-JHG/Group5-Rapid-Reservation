import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import { Contact, Home, Login, Menu, Profile, Register, Reservations, NoPage } from './pages'
import { Layout } from './components'

import './App.css'
import { supabase } from './api/supabase'
import { useEffect, useState } from 'react'

const theme = createTheme()

function App() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // returns current session if there is one (refreshes token if expired)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // watches for changes in authentication state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const { pathname } = location

      setSession(session)

      // if user isn't logged in, don't allow navigation to certain pages
      if (session !== null) {
        // this will automatically re-route user to home page when they login
        if (pathname === '/login' || pathname === '/register') {
          navigate('/')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <MantineProvider theme={theme}>
      <div className="banner">
        <h1>RAPID RESERVATION</h1>
      </div>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
