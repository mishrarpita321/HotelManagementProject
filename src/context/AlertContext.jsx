import React, { createContext, useState } from 'react';

// Create the AlertContext
const AlertContext = createContext();

// Create the AlertProvider
const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  // Function to show the alert
  const showAlert = (type, message, onConfirm, onCancel, onOk, buttonAction) => {
    setAlert({ type, message, onConfirm, onCancel, onOk, buttonAction });
  };

  // Function to hide the alert
  const hideAlert = () => {
    setAlert(null);
  };

  // const handlConfirm=()=>{
  //   if(alert && alert.onConfirm){
  //     alert.onConfirm();
  //   }
  //   hideAlert();
  // }

  // const handleCancel = ()=>{
  //   if(alert && alert.onCancel){
  //     alert.onCancel();
  //   }
  //   hideAlert();
  // }

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
