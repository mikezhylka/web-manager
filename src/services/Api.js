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
    { id: 1, title: 'Pierwsze zadanie', completed: false },
    { id: 2, title: 'Drugie zadanie', completed: true },
    { id: 3, title: 'Trzecie zadanie', completed: false },
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