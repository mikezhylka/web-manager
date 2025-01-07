import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchTaskDetails } from '../services/Api';
import '../styles/TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook do nawigacji
  const [task, setTask] = useState(null);

  // Pobieranie szczegółów zadania
  useEffect(() => {
    const loadTaskDetails = async () => {
      const data = await fetchTaskDetails(id);
      setTask(data);
    };

    loadTaskDetails();
  }, [id]);

  // Edytowanie danych zadania
  const handleEdit = (field, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  return (
    <div className="task-details-container">
      <h1>Szczegóły zadania</h1>
      {task ? (
        <>
          <p>
            <strong>ID zadania:</strong> {task.id}
          </p>
          <p>
            <strong>Tytuł:</strong>
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleEdit('title', e.target.value)}
            />
          </p>
          <p>
            <strong>Opis:</strong>
            <textarea
              value={task.description}
              onChange={(e) => handleEdit('description', e.target.value)}
            ></textarea>
          </p>
          <p>
            <strong>Status:</strong> {task.completed ? 'Zakończone' : 'W trakcie'}
          </p>
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            Powrót do panelu zadań
          </button>
        </>
      ) : (
        <p>Wczytywanie...</p>
      )}
    </div>
  );
};

export default TaskDetails;