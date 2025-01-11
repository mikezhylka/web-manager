import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, fetchTasks, updateTask } from '../services/Api';
import '../styles/Dashboard.css';

const userLegion = 'Legion 1'; // Przykładowy legion przypisany do użytkownika

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const navigate = useNavigate();

  // Pobieranie zadań
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      // Filtrujemy zadania widoczne tylko dla legionu użytkownika
      const filteredTasks = data.filter((task) => task.legion === userLegion);
      setTasks(filteredTasks);
    };

    loadTasks();
  }, []);

  // Dodawanie nowego zadania
  const handleAddTask = async () => {
    if (newTask.trim() === '' || newDeadline === '') return;

    const result = await createTask({
      title: newTask,
      date: newDeadline,
      legion: userLegion, // Dodajemy legion użytkownika do zadania
      status: 'todo',
    });

    if (result.success) {
      setTasks((prevTasks) => [...prevTasks, result.task]);
      setNewTask('');
      setNewDeadline('');
    }
  };

  // Aktualizacja statusu zadania
  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, status: newStatus };
    const result = await updateTask(taskId, updatedTask);
    if (result.success) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? result.task : t))
      );
    }
  };

  // Nawigacja do szczegółów zadania
  const handleViewTaskDetails = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div className="kanban-container">
      <h1>Tablica Kanban - {userLegion}</h1>

      {/* Dodawanie nowego zadania */}
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nowe zadanie"
        />
        <input
          type="date"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
        />
        <button onClick={handleAddTask}>Dodaj</button>
      </div>

      <div className="kanban-board">
        {/* Kolumny Kanban */}
        {['todo', 'in-progress', 'done'].map((status) => (
          <div key={status} className="kanban-column">
            <h2>
              {status === 'todo'
                ? 'Do zrobienia'
                : status === 'in-progress'
                ? 'W trakcie'
                : 'Zakończone'}
            </h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="kanban-task">
                  <p>{task.title}</p>
                  <p>Deadline: {new Date(task.date).toLocaleDateString()}</p>
                  <p>
                    <strong>Legion:</strong> {task.legion}
                  </p>
                  <div className="task-actions">
                    {status !== 'done' && (
                      <button
                        onClick={() =>
                          handleUpdateTaskStatus(
                            task.id,
                            status === 'todo' ? 'in-progress' : 'done'
                          )
                        }
                      >
                        {status === 'todo' ? 'Rozpocznij' : 'Zakończ'}
                      </button>
                    )}
                    <button onClick={() => handleViewTaskDetails(task.id)}>
                      Szczegóły
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;