import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertContext } from 'src/context/AlertContext';
// import { AlertContext } from './AlertContext';

const Alert = () => {
  const { alert, hideAlert } = useContext(AlertContext);

  if (!alert) {
    return null; // If no alert is present, render nothing
  }

  const { type, message, onConfirm, onCancel, onOk, buttonAction } = alert;

  // Define the appropriate icon and color based on the alert type
  let icon, color;
  if (type === 'success') {
    icon = faCheckCircle;
    color = 'text-success';
  } else if (type === 'error') {
    icon = faExclamationCircle;
    color = 'text-danger';
  } else if (type === 'confirmation') {
    icon = faQuestionCircle;
    color = 'text-primary';
  }




  const handleConfirm = () => {
    onConfirm(buttonAction);
    hideAlert();
  };

  const handleCancel = () => {
    onCancel(buttonAction);
    hideAlert();
  };
  const handleSuccessOk = () => {
    onOk(buttonAction);
    hideAlert();
  };

  const handleClose = () => {
    hideAlert();
  };



  return (
    <div className="alert-overlay">
      <div className={`alert alert-${type}`}>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={icon} size="3x" className={`me-3 ${color}`} />
          <div>
            <h5 className="alert-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
            <p className="alert-message">{message}</p>
          </div>
        </div>
        <div className="alert-footer">
          {type === 'confirmation' && (
            <>
              <button className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirm
              </button>
            </>
          )}
          {type === 'success' && (
            <button className="btn btn-primary" onClick={handleSuccessOk}>
              Ok
            </button>
          )}
          {type === 'error' && (
            <button className="btn btn-primary" onClick={handleClose}>
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
