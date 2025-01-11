import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [legion, setLegion] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lista opcji dla stanowiska
  const positions = ['Legionista', 'Centurion', 'Dekurion', 'Optio'];

  // Lista opcji dla legionów
  const legions = Array.from({ length: 10 }, (_, i) => `Legion ${i + 1}`);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserDetails();
        setName(userData.name);
        setPosition(userData.position);
        setLegion(userData.legion || '');
      } catch (err) {
        setError('Nie udało się załadować danych użytkownika.');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUserDetails({ name, position, legion });
      if (result.success) {
        setMessage('Dane zostały zaktualizowane pomyślnie.');
      } else {
        setError('Nie udało się zaktualizować danych.');
      }
    } catch (err) {
      setError('Wystąpił błąd podczas aktualizacji danych.');
    }
  };

  // Funkcja obsługująca powrót do dashboardu
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <h1>Profil użytkownika</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Imię</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Wprowadź swoje imię"
        />

        <label htmlFor="position">Stanowisko</label>
        <select
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="" disabled>
            Wybierz stanowisko
          </option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <label htmlFor="legion">Legion</label>
        <select
          id="legion"
          value={legion}
          onChange={(e) => setLegion(e.target.value)}
        >
          <option value="" disabled>
            Wybierz legion
          </option>
          {legions.map((leg) => (
            <option key={leg} value={leg}>
              {leg}
            </option>
          ))}
        </select>

        <button type="submit">Zapisz zmiany</button>
      </form>

      <button className="back-button" onClick={handleBackToDashboard}>
        Wróć do panelu
      </button>
    </div>
  );
};

export default Profile;