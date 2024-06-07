// src/components/navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>FunArt</div>
      <div style={styles.profile}>Profile</div>
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
  profile: {
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default Navbar;
