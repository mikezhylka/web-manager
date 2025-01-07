import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import kontekstu
import { login } from '../services/Api';
import '../styles/Login.css';

const Login = () => {
  const { setUser } = useContext(AppContext); // Pobieranie funkcji setUser z kontekstu
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook do przekierowania

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result.success) {
        setUser(result.user); // Zapisanie użytkownika w kontekście
        navigate('/dashboard'); // Przekierowanie do dashboardu
      } else {
        setError(result.message || 'Błąd logowania');
      }
    } catch (err) {
      console.error('Błąd podczas logowania:', err);
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Super Aplikacja</h1>
        <p>Jest naprawdę super!</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Zaloguj się</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;