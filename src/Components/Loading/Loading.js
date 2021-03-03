import React from "react";
import styles from "./Loading.module.css";
import { RotateSpinner } from "react-spinners-kit";

const Loading = ({loading}) => {
  return (
    <div className={styles.containerLoading}>
      <RotateSpinner size={70} color="#4da6ff" loading={loading} />
    </div>
  );
};

export default Loading;
