import React, { useState } from 'react';
import { login, requestPasswordReset } from '../services/Api'; // Mockowana funkcja resetowania hasła
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result.success) {
        // Logowanie udane
        navigate('/dashboard');
      } else {
        setError(result.message || 'Nieprawidłowe dane logowania.');
      }
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Wprowadź swój adres e-mail, aby zresetować hasło.');
      return;
    }
    try {
      const result = await requestPasswordReset(email);
      if (result.success) {
        setMessage('Link do resetowania hasła został wysłany na Twój e-mail.');
      } else {
        setError(result.message || 'Nie udało się zresetować hasła.');
      }
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    }
  };

  return (
    <div className="login-container">
      <h1>{isResettingPassword ? 'Resetuj hasło' : 'Zaloguj się'}</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {!isResettingPassword ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Zaloguj się</button>
        </form>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Podaj swój adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Zresetuj hasło</button>
        </div>
      )}

      <button onClick={() => setIsResettingPassword(!isResettingPassword)}>
        {isResettingPassword ? 'Powrót do logowania' : 'Zapomniałeś hasła?'}
      </button>
    </div>
  );
};

export default Login;