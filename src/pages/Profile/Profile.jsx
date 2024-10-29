import { useState, useEffect } from 'react';
import { supabase } from '../../api/supabase';
import './profile.css';

export const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Fetch user information from Supabase on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        try {
          const { data, error } = await supabase
            .from('users') // Replace 'users' with your actual table name
            .select('first_name, last_name, email')
            .eq('id', user.id) // Assuming 'id' is used to identify the user
            .single();

          if (error) throw error;

          setUserInfo({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            address: '123 Default St',
            city: 'Default City',
            state: 'Default State',
            zipCode: '00000',
            phoneNumber: '000-000-0000',
          });
        } catch (error) {
          setErrors({ root: error.message || 'Failed to load user information.' });
        }
      }
    };

    fetchUserInfo();
  }, []);

  // Handler for toggling edit mode for a specific field
  const handleEditClick = (field) => {
    setEditingField(field);
  };

  // Handler for saving the updated information
  const handleSaveClick = async (field, value) => {
    if (!userInfo) return;

    setUserInfo({
      ...userInfo,
      [field]: value,
    });
    setEditingField(null); // Exit editing mode after saving

    try {
      const { error } = await supabase
        .from('users') // Replace with your table name
        .update({ [field]: value })
        .eq('id', userInfo.id); // Assuming id is used to identify the user

      if (error) throw error;

      setMessage('Your information has been updated successfully.');
      await sendUpdateNotification(userInfo.email);
    } catch (error) {
      setErrors({ root: error.message || 'Update failed. Please try again.' });
    }
  };

  // Function to send an update notification email
  const sendUpdateNotification = async (email) => {
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: JSON.stringify({
          to: email,
          subject: 'Profile Update Notification',
          text: `Hello, your personal information has been updated successfully.`,
        }),
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error sending email notification:', error.message);
    }
  };

  // Render function for displaying fields with edit functionality
  const renderField = (label, field) => (
    <div>
      <label>{label}: </label>
      {editingField === field ? (
        <input
          type="text"
          value={userInfo[field]}
          onChange={(e) =>
            setUserInfo({ ...userInfo, [field]: e.target.value })
          }
        />
      ) : (
        <span>{userInfo[field]}</span>
      )}
      {editingField === field ? (
        <button onClick={() => handleSaveClick(field, userInfo[field])}>
          Save
        </button>
      ) : (
        <button onClick={() => handleEditClick(field)}>Edit</button>
      )}
    </div>
  );

  return (
    <div>
      <h2>Edit Profile</h2>
      {userInfo ? (
        <>
          {renderField('First Name', 'firstName')}
          {renderField('Last Name', 'lastName')}
          {renderField('Address', 'address')}
          {renderField('City', 'city')}
          {renderField('State', 'state')}
          {renderField('Zip Code', 'zipCode')}
          {renderField('Phone Number', 'phoneNumber')}
          {renderField('Email', 'email')}
          {message && <p className="success">{message}</p>}
          {errors.root && <p className="error">{errors.root}</p>}
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};
