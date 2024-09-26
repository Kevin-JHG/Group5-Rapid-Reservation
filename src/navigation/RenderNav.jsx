import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './NavLayout';
import Home from './Home';
import Contact from './Contact';
import LoginRegister from './Login&Register';
import Menu from './Menu';
import Reservations from './Reservations';
import NoPage from './NoPage';

function RenderNavigationMenu() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login-register' element={<LoginRegister />} />
          <Route path='menu' element={<Menu />} />
          <Route path='reservations' element={<Reservations />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RenderNavigationMenu;
