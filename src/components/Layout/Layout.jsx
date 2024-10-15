import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './layout.css';

// Prevent navigation link dragging
const DraggableNavLink = ({ to, children }) => (
  <NavLink draggable="false" to={to}>
    {children}
  </NavLink>
);

export const Layout = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <ul>
            <li>
              <DraggableNavLink to="/">Home</DraggableNavLink>
            </li>
            <li>
              <DraggableNavLink to="/reservations">Reservations</DraggableNavLink>
            </li>
            <li>
              <DraggableNavLink to="/menu">Menu</DraggableNavLink>
            </li>
            <li>
              <DraggableNavLink to="/login">Login</DraggableNavLink>
            </li>
            <li>
              <DraggableNavLink to="/register">Register</DraggableNavLink>
            </li>
            <li>
              <DraggableNavLink to="/contact">Contact</DraggableNavLink>
            </li>
          </ul>
        </div>
        
        <div className="profile-icon" onClick={handleProfileClick}>
          <img 
            src="./profile_avatar.png" 
            alt="Profile" 
            className="profile-icon-img"
          />
        </div>
      </nav>

      <Outlet />
    </>
  );
};
