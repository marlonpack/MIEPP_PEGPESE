import React from "react";
import styles from "./YesNoModal.module.css";
import useOutsideClick from "../../Hooks/useOutsideClick";
import Button from "../Forms/Button";

const YesNoModal = ({ question, action, close }) => {
  let domNode = useOutsideClick(() => {
    close();
  });

  return (
    <div className={styles.containerYesNoModal}>
      <div
        ref={domNode}
        className={[styles.modalYesNo, "animeVisible"].join(" ")}
      >
        <h3 className={styles.modalYesNoQuestion}>{question}</h3>
        <div className={styles.modalYesNoButtons}>
          <Button
            type="button"
            style={styles.modalYesNoButtonYes}
            onClick={() => {
              action();
              close();
            }}
          >
            Sim
          </Button>
          <Button
            type="button"
            style={styles.modalYesNoButtonNo}
            onClick={() => close()}
          >
            Não
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YesNoModal;
