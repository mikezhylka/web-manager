import React, { createContext, useState } from 'react';

// Tworzenie kontekstu
export const AppContext = createContext();

// Provider dla kontekstu
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};