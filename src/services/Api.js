// Mockowany URL API (dla porządku)
const API_URL = 'http://localhost:8000';

// Mockowanie funkcji login
export const login = async (credentials) => {
  console.log('Mock login:', credentials);
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return {
      success: true,
      user: {
        id: 1,
        name: 'Testowy Użytkownik',
        email: credentials.email,
      },
    };
  } else {
    return {
      success: false,
      message: 'Nieprawidłowe dane logowania',
    };
  }
};

// Mockowanie funkcji fetchTasks
export const fetchTasks = async () => {
  console.log('Mock fetch tasks');
  return [
    { id: 1, title: 'Pierwsze zadanie', completed: false, date: '2025-01-07' },
    { id: 2, title: 'Drugie zadanie', completed: true, date: '2025-01-08' },
    { id: 3, title: 'Trzecie zadanie', completed: false, date: '2025-01-09' },
  ];
};

// Mockowanie funkcji fetchTaskDetails
export const fetchTaskDetails = async (id) => {
  console.log('Mock fetch task details:', id);
  return {
    id,
    title: `Zadanie ${id}`,
    description: 'To jest szczegółowy opis zadania.',
    completed: id % 2 === 0, // Co drugie zadanie ustawione jako zakończone
    date: '2025-01-07', // Przykładowa data
  };
};

// Dodaj zadanie
export const createTask = async (taskData) => {
  console.log('Mock create task:', taskData);
  return {
    success: true,
    task: {
      id: Math.floor(Math.random() * 1000), // Losowe ID
      ...taskData,
      completed: false,
    },
  };
};

// Aktualizuj zadanie
export const updateTask = async (id, taskData) => {
  console.log('Mock update task:', id, taskData);
  return {
    success: true,
    task: {
      id,
      ...taskData,
    },
  };
};

// Usuń zadanie
export const deleteTask = async (id) => {
  console.log('Mock delete task:', id);
  return {
    success: true,
    id,
  };
};

// Mockowanie funkcji resetowania hasła
export const requestPasswordReset = async (email) => {
  console.log('Mock request password reset:', email);
  if (email === 'test@example.com') {
    return { success: true, message: 'E-mail wysłany!' };
  } else {
    return { success: false, message: 'Nie znaleziono konta z tym adresem e-mail.' };
  }
};

// Mockowanie funkcji pobierania szczegółów użytkownika
export const getUserDetails = async () => {
  console.log('Mock get user details');
  return {
    name: 'Wielgas Kufas',
    position: 'Centurion Rzymskich Legionów',
  };
};

// Mockowanie funkcji aktualizacji szczegółów użytkownika
export const updateUserDetails = async (userDetails) => {
  console.log('Mock update user details:', userDetails);
  return { success: true }; // Symulacja sukcesu
};

// Mockowanie funkcji pobierania zadań z przypisaniem do dat
export const fetchTasksByDate = async (date) => {
  console.log('Mock fetch tasks by date:', date);
  const allTasks = await fetchTasks();
  const filteredTasks = allTasks.filter(
    (task) => new Date(task.date).toDateString() === new Date(date).toDateString()
  );
  return filteredTasks;
};
// Mockowanie funkcji pobierania komentarzy do zadania
export const fetchCommentsForTask = async (taskId) => {
    console.log('Mock fetch comments for task:', taskId);
    return [
      { id: 1, taskId, author: 'User1', text: 'To zadanie jest priorytetowe!', date: '2025-01-07' },
      { id: 2, taskId, author: 'User2', text: 'Czy możemy dodać więcej szczegółów?', date: '2025-01-08' },
    ];
  };
  
  // Mockowanie funkcji dodawania komentarza do zadania
  export const addCommentToTask = async (taskId, comment) => {
    console.log('Mock add comment to task:', taskId, comment);
    return {
      success: true,
      comment: {
        id: Math.floor(Math.random() * 1000), // Losowe ID
        taskId,
        ...comment,
      },
    };
  };