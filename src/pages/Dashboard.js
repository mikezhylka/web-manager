import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../services/Api';
import { useNavigate } from 'react-router-dom'; // Import hooka nawigacji
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate(); // Hook do nawigacji

  // Pobieranie zadań
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };

    loadTasks();
  }, []);

  // Dodawanie nowego zadania
  const handleAddTask = async () => {
    if (newTask.trim() === '') return;

    const result = await createTask({ title: newTask });
    if (result.success) {
      setTasks((prevTasks) => [...prevTasks, result.task]);
      setNewTask('');
    }
  };

  // Zmiana statusu zadania
  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Usuwanie zadania
  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id);
    if (result.success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  // Nawigacja do szczegółów zadania
  const handleViewTask = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Panel zadań</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nowe zadanie"
        />
        <button onClick={handleAddTask}>Dodaj</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : 'pending'}
          >
            {task.title} - {task.completed ? 'Zakończone' : 'W trakcie'}
            <div className="task-actions">
              <button onClick={() => toggleTaskStatus(task.id)}>Zmień status</button>
              <button onClick={() => handleViewTask(task.id)}>Pokaż szczegóły</button>
              <button onClick={() => handleDeleteTask(task.id)} className="delete-task">
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;