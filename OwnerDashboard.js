import React from 'react';

function OwnerDashboard({ user, onLogout }) {
  return (
    <div style={styles.container}>
      <h2>Welcome, {user.name} (Store Owner)</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div style={styles.card}>
        <h3>Owner Features</h3>
        <ul>
          <li>View Your Store Ratings</li>
          <li>Analyze User Feedback</li>
          <li>See Average Ratings</li>
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
    background: '#fefefe',
    borderRadius: '10px',
    display: 'inline-block'
  },
  logout: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default OwnerDashboard;
