import { useState } from 'react';
import './profile.css'

export const Profile = () => {
  // User's initial information
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com',
  });

  // State to track which field is being edited
  const [editingField, setEditingField] = useState(null);

  // Handler for toggling edit mode for a specific field
  const handleEditClick = (field) => {
    setEditingField(field);
  };

  // Handler for saving the updated information
  const handleSaveClick = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
    setEditingField(null); // Exit editing mode after saving
  };

  // Render function for displaying fields with edit functionality
  const renderField = (label, field) => {
    return (
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
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {renderField('First Name', 'firstName')}
      {renderField('Last Name', 'lastName')}
      {renderField('Address', 'address')}
      {renderField('Phone Number', 'phoneNumber')}
      {renderField('Email', 'email')}
    </div>
  );
};
