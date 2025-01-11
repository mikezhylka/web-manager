import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Import biblioteki kalendarza
import 'react-calendar/dist/Calendar.css'; // Stylizacja kalendarza
import '../styles/Calendar.css'; // Własne style
import { fetchTasks } from '../services/Api'; // Mockowana funkcja pobierania zadań
import { useNavigate } from 'react-router-dom'; // Hook do nawigacji

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForDate, setTasksForDate] = useState([]);
  const navigate = useNavigate(); // Hook do nawigacji

  // Pobieranie zadań
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };

    loadTasks();
  }, []);

  // Obsługa wyboru daty
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Filtruj zadania dla wybranej daty
    const tasksForSelectedDate = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });

    setTasksForDate(tasksForSelectedDate);
  };

  // Generowanie zawartości dla daty w kalendarzu
  const renderTileClass = ({ date, view }) => {
    if (view === 'month') {
      const hasTask = tasks.some((task) => {
        const taskDate = new Date(task.date);
        return taskDate.toDateString() === date.toDateString();
      });

      return hasTask ? 'highlighted-date' : '';
    }
    return '';
  };

  // Powrót do dashboardu
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="calendar-container">
      <h1>Kalendarz zadań</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={renderTileClass} // Dodanie klasy CSS do płytek
      />

      <div className="tasks-for-date">
        <h2>Zadania na {selectedDate.toDateString()}</h2>
        {tasksForDate.length > 0 ? (
          <ul>
            {tasksForDate.map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : 'pending'}>
                {task.title} - Deadline: {new Date(task.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak zadań na wybrany dzień.</p>
        )}
      </div>

      {/* Przycisk powrotu do dashboardu */}
      <button className="back-button" onClick={handleBackToDashboard}>
        Wróć do panelu
      </button>
    </div>
  );
};

export default CalendarPage;