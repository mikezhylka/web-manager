import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Import AppProvider
import CalendarPage from './pages/Calendar'; // Import nowej strony
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile'; // Import nowej strony Profile
import TaskDetails from './pages/TaskDetails';

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