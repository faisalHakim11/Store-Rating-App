// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.email || !formData.password || (!isLogin && (!formData.name || !formData.address || !formData.role))) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = isLogin ? 'http://localhost:8081/api/login' : 'http://localhost:8081/api/register';
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;
      const res = await axios.post(url, payload);

      if (isLogin) {
        const role = res.data.user.role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'owner') navigate('/owner');
        else navigate('/user');
      } else {
        alert('Registration successful. You can now login.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome to Login Page</h1>
        <div style={styles.buttonGroup}>
          <button onClick={() => setIsLogin(true)} style={isLogin ? styles.activeTab : styles.inactiveTab}>Login</button>
          <button onClick={() => setIsLogin(false)} style={!isLogin ? styles.activeTab : styles.inactiveTab}>Sign Up</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} style={styles.input} />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} style={styles.input} />
              <select name="role" onChange={handleChange} style={styles.input}>
                <option value="">Select Role</option>
                <option value="admin">System Administrator</option>
                <option value="owner">Store Owner</option>
                <option value="user">Normal User</option>
              </select>
            </>
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.button}>{isLogin ? 'Login' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#1E3A8A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.25)',
    width: '400px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1E3A8A',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  activeTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#1E3A8A',
    color: 'white',
    border: 'none',
  },
  inactiveTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default AuthForm;
