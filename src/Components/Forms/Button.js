import React from "react";


function Button({ children, style, ...props }) {
  return (
 
      <button {...props} className={`${style}`}>
        {children}
      </button>

  );
}

export default Button;