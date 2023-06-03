// import { Modal } from "bootstrap";

// import { Button, Modal } from "bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal } from "react-bootstrap";

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function AlertModal({
  onClose,
  isOpen,
  type = "confirm",
  title = "",
  content = "", }) {

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
      {/* <div className="modalpopup"> */}
      <Modal
        className="modalpopup"
        // {...props}
        show={isOpen}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <div onClick={closeModal} style={{ display: "flex", alignSelf: "flex-end", backgroundColor: "#a571ba", height: "25px", width: "25px", cursor: "pointer", borderRadius: "30px", justifyContent: "center", position: "absolute", top: "-12px", right: "-12px", alignItems: "center" }} >
          <FontAwesomeIcon icon={faClose} />
        </div> */}
        {/* <div>Alert</div> */}

        <div className="confirm">
          {title}
        </div>
        <div className="contentModal"> <Image src="/images/checked.png" width={"20"} height={"20"}/>{content}</div>
        <div className="popupButtons">
          <div className="buttonClose"><Button onClick={() => onClose(false)} >Close</Button> </div>
          <div className="buttonCancel"><Button onClick={() => onClose(false)} >Cancel</Button> </div>
          {/* <h1>Roshan</h1> */}
        </div>
      </Modal>
      {/* </div> */}
    </>
  );
}

export default AlertModal;
