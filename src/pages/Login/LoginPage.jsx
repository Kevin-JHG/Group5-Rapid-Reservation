import { useState } from 'react';
import { Login } from './Login';

export const LoginPage = () => {
  const [setSession] = useState(null); // Store the session state

  const handleSessionChange = (newSession) => {
    setSession(newSession);
  };

  return (
    <div>
      <Login setSession={handleSessionChange} />
    </div>
  );
};
