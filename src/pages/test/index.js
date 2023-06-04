import React, { useContext } from 'react';
import { AlertContext } from 'src/context/AlertContext';
// import { AlertContext } from './AlertContext';

const App = () => {
  const { showAlert } = useContext(AlertContext);

  const handleConfirmation = () => {
    showAlert('confirmation', 'Are you sure you want to proceed?');
  };

  const handleSuccess = () => {
    showAlert('success', 'Operation completed successfully!');
  };

  const handleError = () => {
    showAlert('error', 'An error occurred.');
  };

  return (
    <div>
      <button onClick={handleConfirmation}>Show Confirmation</button>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};

export default App;
