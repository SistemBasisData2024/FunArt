import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/login/');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred while registering');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            style={styles.input}
            required
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </div>
        <p style={styles.loginText}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  icon: {
    marginRight: '10px',
    color: '#666',
  },
  input: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '8px',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  loginText: {
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
  loginLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Register;
