import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/reservations'>Reservations</NavLink>
          </li>
          <li>
            <NavLink to='/menu'>Menu</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
