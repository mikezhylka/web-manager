import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();

  return (
    <div className="task-details-container">
      <h1>Szczegóły zadania</h1>
      <p><strong>ID zadania:</strong> {id}</p>
      <p>Opis zadania i szczegóły będą widoczne tutaj.</p>
    </div>
  );
};

export default TaskDetails;