import React from 'react';

function Dashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Your role is: {user.role}</p>
    </div>
  );
}

export default Dashboard;