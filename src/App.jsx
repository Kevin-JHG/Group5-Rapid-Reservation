import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import { LoginPage } from './pages/Login/LoginPage'
import { Contact, Home, Menu, Profile, Register, Reservations, NoPage, Dashboard } from './pages'
import { ResetPassword } from './pages/ResetPassword/ResetPassword'
import { GetPasswordReset } from './pages/ResetPassword/GetPasswordReset'
import { Layout } from './components'

import './App.css'
import { supabase } from './api/supabase'
import { useEffect, useState } from 'react'

const theme = createTheme()

function App() {
  const [session, setSession] = useState(null)
  const [isEmployee, setIsEmployee] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isUserEmployee = async userId => {
    const { data: profile, error: profileError } = await supabase.from('profile').select('*').eq('id', userId)

    if (profileError) {
      throw profileError
    }

    if (!profile) {
      throw 'User profile does not exist'
    }

    // set state (used in nav bar)
    const isEmp = profile[0].role === 'employee'
    setIsEmployee(isEmp)

    // only allow employees to access the /dashboard page
    const { pathname } = location
    if (pathname === '/dashboard' && !isEmp) {
      navigate('/')
    }
  }

  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Watch for changes in authentication state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      const { pathname } = location

      if (session !== null) {
        // Redirect logged-in users from login/register
        if (pathname === '/login' || pathname === '/register') {
          navigate('/')
        }

        // check if user is employee,
        isUserEmployee(session.user.id)
      } else {
        // Prevent unauthorized access to protected routes
        const protectedRoutes = ['/profile', '/dashboard']
        if (protectedRoutes.includes(pathname)) {
          navigate('/login')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [location, navigate])

  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout session={session} isEmployee={isEmployee} />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="get-password-reset" element={<GetPasswordReset />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
