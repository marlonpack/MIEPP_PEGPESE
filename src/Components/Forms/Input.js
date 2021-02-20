import React from 'react';
import styles from './Input.module.css';


function Input({ label, type, name, value, readonly, defaultValue, onChange, error, onBlur, style , placeholder, step }) {
  return (
    <div  className={`${style} `}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        readOnly={readonly}
        placeholder={placeholder}
        autoComplete="off"
        step={step}
      />
      {/* {error && <p className={styles.error}>{error}</p>} */}
    </div>
  );
}

export default Input;