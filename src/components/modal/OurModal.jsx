// import { Modal } from "bootstrap";

// import { Button, Modal } from "bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal } from "react-bootstrap";

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OurModal({ show, onHide, children, }) {

  // alert('hi')
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    // alert('close')
    onHide(false);
  };

  return (
    <>
      <Modal
        // {...props}
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-large"
      >
        <div onClick={closeModal} style={{ display: "flex", alignSelf: "flex-end", backgroundColor: "#a571ba", height: "25px", width: "25px", cursor: "pointer", borderRadius: "30px", justifyContent: "center", position: "absolute", top: "-12px", right: "-12px", alignItems: "center" }} >
          <FontAwesomeIcon icon={faClose} />
        </div>
        {/* <div>Roshan</div> */}
        {children}
        {/* <h1>Roshan</h1> */}
      </Modal>
    </>
  );
}

export default OurModal;
