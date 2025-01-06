import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const tasks = [
    { id: 1, title: 'Pierwsze zadanie', completed: false },
    { id: 2, title: 'Drugie zadanie', completed: true },
    { id: 3, title: 'Trzecie zadanie', completed: false },
  ];

  return (
    <div className="dashboard-container">
      <h1>Panel zadań</h1>
      <p>Zarządzaj swoimi zadaniami i śledź postępy:</p>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : 'pending'}>
            {task.title} - {task.completed ? 'Zakończone' : 'W trakcie'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;