import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

const Home = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          Welcome back, User! You are logged in.
          <button onClick={logout}>Log out</button>
          <Dashboard />
        </div>
      ) : (
        <div>
          <h2>Please log in to access your finance tracker:</h2>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Home;