import React from "react";
import Modal from "../Login/ModalPassword";

const NotificationError = ({ error }) => {
  if (!error) return null;
  // if(error ==('Default password is not permited')) return <Modal/>

  return <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>;
};

export default NotificationError;