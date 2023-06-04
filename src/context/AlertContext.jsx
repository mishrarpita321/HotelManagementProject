import React, { createContext, useState } from 'react';

// Create the AlertContext
const AlertContext = createContext();

// Create the AlertProvider
const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  // Function to show the alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  // Function to hide the alert
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
