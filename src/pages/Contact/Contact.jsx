import { Button, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './contact.module.css';
import { IconPhone, IconMail, IconClock } from '@tabler/icons-react';
import { useEffect } from 'react';

export const Contact = () => {
  const navigate = useNavigate();

  // Fade in on page load
  useEffect(() => {
    document.getElementById('contact-container').style.opacity = '1';
  }, []);

  const handleReserveClick = () => {
    navigate('/reservations');
  };

  return (
    <div id="contact-container" className={classes.container}>
      <div className={classes.mainContent}>
        <div className={classes.contactSection}>
          <h1>Contact Us</h1>
          <p><IconPhone size={16} /> 123-456-7890</p>
          <Divider className={classes.divider} />
          <p><IconMail size={16} /> rapidreservation@email.com</p>
          <Divider className={classes.divider} />
          <p><IconClock size={16} /> Mon-Fri 9am-5pm<br />Sat-Sun 10am-4pm</p>
        </div>

        <div className={classes.mapSection}>
          <h3>Find Us Here</h3>
          <iframe
            className={classes.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206989.23160091825!2d-78.8098629915542!3d35.84393376106684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5a2f9f51e0f7%3A0x6790b6528a11f0ad!2sRaleigh%2C%20NC!5e0!3m2!1sen!2sus!4v1729378912650!5m2!1sen!2sus"
            loading="lazy"
          />
        </div>
      </div>

      <div className={classes.infoSection}>
        <div className={classes.infoText}>
          <h2>About Us</h2>
          <p>Our mission is to revolutionize reservations. Order ahead when you reserve your table for a seamless dining experience.</p>
          <Button color="black" className={classes.reserveButton} onClick={handleReserveClick}>
            Reserve
          </Button>
        </div>
        <img className={classes.image} src="./logo.jpg" alt="Reservation" />
      </div>
    </div>
  );
};
