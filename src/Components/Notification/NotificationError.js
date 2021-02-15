import React from "react";
import { NotificationStore } from "./StoreNotification";


const NotificationError = ({ error }) => {

  

  if (!error) return null;
  return NotificationStore();
 
};

export default NotificationError;