import React from "react";
import styles from "./modal.module.css"; // Import the CSS module

const ImageModal = ({ show, onHide, image }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles["modal-overlay"]} onClick={onHide}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <button className={styles["modal-close"]} onClick={onHide}>
              &#x2715;
            </button>
          </div>
          <div className={styles["modal-body"]}>
            <img
              src={image}
              alt="Image Preview"
              className={styles["modal-image"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
