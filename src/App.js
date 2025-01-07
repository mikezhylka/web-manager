import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Import AppProvider
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;