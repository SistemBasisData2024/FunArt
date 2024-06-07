// src/components/navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>FunArt</div>
      <div style={styles.menu}>
        {!user ? (
          <button onClick={() => navigate('/login/')} style={styles.button}>Login</button>
        ) : null}
        <div style={styles.profile}>
          {user ? `Logged in as: ${user.username}` : 'Loading...'}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  profile: {
    fontSize: '18px',
  },
};

export default Navbar;