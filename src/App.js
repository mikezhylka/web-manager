import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Import AppProvider
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile'; // Import nowej strony Profile
import CalendarPage from './pages/Calendar'; // Import nowej strony

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<CalendarPage />} /> {/* Dodano ścieżkę */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;