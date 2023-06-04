// import { Modal } from "bootstrap";

// import { Button, Modal } from "bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal } from "react-bootstrap";

import { faClose } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function AlertModal2({
  onClose,
  isOpen,
  type = "confirm",
  title = "",
  content = "", }) {

  // const [typee, setType] = useState('confirmation')
  const [typee, setType] = useState('success')
  // const [typee, setType] = useState('error')

  return (
    <>
      {typee == 'confirmation' && (
        <>
          <Modal
            show={isOpen}
            // onHide={() => onClose(false)}
            centered
            dialogClassName="modal-compact"
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton className="bg-primary text-white p-2">
              <Modal.Title className="fw-bold fs-5">Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex align-items-center p-4">
              <FontAwesomeIcon icon={faQuestionCircle} size="3x" color="blue" className="me-4" />
              <p className="m-0">Are you sure you want to proceed?</p>
            </Modal.Body>
            <Modal.Footer className="p-2">
              <Button variant="secondary">
                Cancel
              </Button>
              <Button variant="primary" >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {typee == 'success' && (
        <>
          <Modal
            show={isOpen}
            onHide={() => onClose(false)}
            centered
            dialogClassName="modal-compact"
          >
            <Modal.Header closeButton className="bg-success text-white p-2">
              <Modal.Title className="fw-bold fs-5">Success</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex align-items-center p-4">
              <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" className="me-4" />
              <p className="m-0">Operation completed successfully!</p>
            </Modal.Body>
            <Modal.Footer className="p-2">
              <Button variant="success" onClick={() => onClose(false)}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {typee == 'error' && (
        <>
          <Modal
            show={isOpen}
            onHide={() => onClose(false)}
            centered
            dialogClassName="modal-compact"
          >
            <Modal.Header closeButton className="bg-danger text-white p-2">
              <Modal.Title className="fw-bold fs-5">Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex align-items-center p-4">
              <FontAwesomeIcon icon={faTimesCircle} size="3x" color="red" className="me-4" />
              <p className="m-0">An error occurred. Please try again later.</p>
            </Modal.Body>
            <Modal.Footer className="p-2">
              <Button variant="secondary" onClick={() => onClose(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default AlertModal2;
