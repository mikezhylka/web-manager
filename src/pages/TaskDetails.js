import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchTaskDetails, fetchCommentsForTask, addCommentToTask } from '../services/Api';
import '../styles/TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook do nawigacji
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  // Pobieranie szczegółów zadania i komentarzy
  useEffect(() => {
    const loadTaskDetails = async () => {
      try {
        const taskData = await fetchTaskDetails(id);
        setTask(taskData);

        const commentsData = await fetchCommentsForTask(id);
        setComments(commentsData);
      } catch (err) {
        setError('Nie udało się załadować szczegółów zadania.');
      }
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

  // Dodawanie nowego komentarza
  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const result = await addCommentToTask(id, {
        author: 'Aktualny Użytkownik', // Możesz zastąpić dynamicznym autorem
        text: newComment,
        date: new Date().toISOString(),
      });

      if (result.success) {
        setComments((prevComments) => [...prevComments, result.comment]);
        setNewComment('');
      }
    } catch (err) {
      setError('Nie udało się dodać komentarza.');
    }
  };

  return (
    <div className="task-details-container">
      <h1>Szczegóły zadania</h1>
      {error && <p className="error-message">{error}</p>}
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

          {/* Sekcja komentarzy */}
          <div className="comments-section">
            <h2>Komentarze</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>
                    <strong>{comment.author}</strong> ({new Date(comment.date).toLocaleDateString()}):{' '}
                    {comment.text}
                  </p>
                </li>
              ))}
            </ul>

            {/* Dodawanie nowego komentarza */}
            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Dodaj komentarz..."
              ></textarea>
              <button onClick={handleAddComment}>Dodaj komentarz</button>
            </div>
          </div>
        </>
      ) : (
        <p>Wczytywanie...</p>
      )}
    </div>
  );
};

export default TaskDetails; 