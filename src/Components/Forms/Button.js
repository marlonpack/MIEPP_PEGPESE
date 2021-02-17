import React from "react";
import styles from "./Button.module.css";

function Button({ children, style, ...props }) {
  return (
    // <div className={`${style} ${styles.div}`}>
      <button {...props} className={`${style} ${styles.button} `}>
        {children}
      </button>
    // </div>
  );
}

export default Button;