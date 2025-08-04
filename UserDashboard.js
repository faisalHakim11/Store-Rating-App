import React from 'react';

function UserDashboard({ user, onLogout }) {
  return (
    <div style={styles.container}>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div style={styles.card}>
        <h3>User Features</h3>
        <ul>
          <li>View All Stores</li>
          <li>Submit Ratings (1-5)</li>
          <li>View Your Own Ratings</li>
        </ul>
      </div>
      <button onClick={onLogout} style={styles.logout}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial',
    textAlign: 'center'
  },
  card: {
    marginTop: '20px',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '10px',
    display: 'inline-block'
  },
  logout: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default UserDashboard;
