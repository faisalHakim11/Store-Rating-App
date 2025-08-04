import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import OwnerDashboard from './OwnerDashboard';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data.user); // assumes backend returns { user: { role, name, email, ... } }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <AuthForm onLogin={handleLogin} /> : <Navigate to={`/${user.role.toLowerCase()}`} />}
        />
        <Route path="/admin" element={user?.role === 'System Administrator' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/user" element={user?.role === 'Normal User' ? <UserDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/owner" element={user?.role === 'Store Owner' ? <OwnerDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
