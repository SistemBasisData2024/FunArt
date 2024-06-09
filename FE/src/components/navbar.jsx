import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';
import { FaUser } from 'react-icons/fa'; // Import icon from react-icons library

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // State to control visibility of dropdown menu

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>FunArt</div>
      <div style={styles.menu}>
        <ul style={styles.menuItems}>
          <li>
            <Link to="/" style={styles.menuLink}>Home</Link>
          </li>
          <li>
            <Link to="/gallery" style={styles.menuLink}>Gallery</Link>
          </li>
        </ul>
      </div>
      <div style={styles.profileContainer}>
        {!user ? (
          <button onClick={() => navigate('/login/')} style={styles.button}>
            Login
          </button>
        ) : null}
        <div
          style={styles.profile}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <FaUser style={{ marginRight: '5px' }} /> {/* Icon */}
          {user ? `Logged in as: ${user.username}` : 'Loading...'}
          {/* Dropdown Menu */}
          {showMenu && (
            <ul style={styles.dropdown}>
              <li>Profile</li>
              <li onClick={() => navigate('/logout/')}>Logout</li>
            </ul>
          )}
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
    width: '100%', // Full width
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItems: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuLink: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '20px',
  },
  button: {
    padding: '5px 10px',
    cursor: 'pointer',
    backgroundColor: '#555',
    border: 'none',
    color: '#fff',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative', // Position for dropdown menu
    marginLeft: '20px', // Add margin between Login button and profile
  },
  dropdown: {
    position: 'absolute',
    top: '30px',
    right: 0,
    backgroundColor: '#fff',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    listStyle: 'none',
    margin: 0,
    zIndex: 1,
  },
};

export default Navbar;
