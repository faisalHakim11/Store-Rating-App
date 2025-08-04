import React from 'react';

function AdminDashboard({ user, onLogout }) {
  return (
    <div style={styles.container}>
      <h2>Welcome, {user.name} (Admin)</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div style={styles.card}>
        <h3>Admin Features</h3>
        <ul>
          <li>View All Stores</li>
          <li>View All Users</li>
          <li>Manage All Ratings</li>
          <li>Delete any Store or Rating</li>
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
    background: '#f1f1f1',
    borderRadius: '10px',
    display: 'inline-block'
  },
  logout: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default AdminDashboard;
