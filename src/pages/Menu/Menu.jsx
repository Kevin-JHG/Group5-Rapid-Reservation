import React, { useEffect, useState } from "react";
import { supabase } from '../../api/supabase'
import './menu.css';

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [selectedAppetizer, setSelectedAppetizer] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedDessert, setSelectedDessert] = useState('');
  const [appetizers, setAppetizers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        console.log("Fetching menu items...");
        const { data, error } = await supabase.from('menu_item').select('*');

        if (error) {
          console.error("Error fetching menu items:", error.message);
          setError(error.message);
        } else {
          console.log("Data received:", data);
          setMenuItems(data);

          // Categorizing menu items
          setAppetizers(data.filter(item => item.category === 'appetizer'));
          setDrinks(data.filter(item => item.category === 'drink'));
          setDesserts(data.filter(item => item.category === 'dessert'));
        }
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container">
      <h1 className="menu-header"></h1>
      
      <nav className="menu-navigation">
        <ul>
      
        </ul>
      </nav>

      <h2 className="menu-title">Menu</h2>

      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        placeholder="Enter Restaurant Name"
        className="restaurant-input"
      />

      <div className="dropdowns">
        <label>
          Appetizer:
          <select value={selectedAppetizer} onChange={(e) => setSelectedAppetizer(e.target.value)}>
            <option value="">Select an Appetizer</option>
            {appetizers.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </label>

        <label>
          Drink:
          <select value={selectedDrink} onChange={(e) => setSelectedDrink(e.target.value)}>
            <option value="">Select a Drink</option>
            {drinks.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </label>

        <label>
          Dessert:
          <select value={selectedDessert} onChange={(e) => setSelectedDessert(e.target.value)}>
            <option value="">Select a Dessert</option>
            {desserts.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {menuItems.length > 0 ? (
        <div className="menu-items">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : !loading && !error ? (
        <p className="no-items">No menu items available.</p>
      ) : null}
    </div>
  );
};
