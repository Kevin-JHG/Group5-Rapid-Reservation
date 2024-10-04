import { useNavigate } from 'react-router-dom';

import './home.css'

export const Home = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleReserve = () => {
    navigate('/reservations'); // Go to the Reservations page
  };

  const handleMenu = () => {
    navigate('/menu'); // Go to the Menu page
  };

  const handleLogin = () => {
    navigate('/login'); // Go to the Login page
  };
  return (
    <>
      <div id="HomeButtonContainer">
        <button className="HomeButtons" onClick={handleReserve}>RESERVE</button>
        <button className="HomeButtons" onClick={handleMenu}>MENU</button>
      </div>

      <h2 id="gallery-title">Featured Dishes</h2>
      <div className="gallery-container">
        <div className="gallery">
          <img src="./Lasagna.png" alt="Placeholder Text" width="600" height="400"></img>
          <div className="name">Lasagna</div>
        </div>
        <div className="gallery">
          <img src="Tiramisu.png" alt="Placeholder Text" width="600" height="400"></img>
          <div className="name">Tiramisu</div>
        </div>
        <div className="gallery">
          <img src="./Spaghetti.png" alt="Placeholder Text" width="600" height="400"></img>
          <div className="name">Spaghetti</div>
        </div>
        <div className="gallery">
          <img src="Garlic_Bread.png" alt="Placeholder Text" width="600" height="400"></img>
          <div className="name">Garlic Bread</div>
        </div>
      </div>

      <button id="LoginButton" onClick={handleLogin}>LOGIN / SIGN UP</button>

      <h2 id="customers">What Our Customers Say</h2>

      <p id="temp">Coming Soon</p>
    </>
  );
};
