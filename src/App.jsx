import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

import { Contact, Home, Login, Menu, Profile, Register, Reservations, NoPage } from './pages'
import { Layout } from './components'

import './App.css'

const theme = createTheme()

function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="banner">
        <h1>RAPID RESERVATION</h1>
      </div>

      <BrowserRouter>
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
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
