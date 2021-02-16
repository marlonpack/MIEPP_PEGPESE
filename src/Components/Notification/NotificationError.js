import React from "react";
import { NotificationStore } from "./StoreNotification";


const NotificationError = ({ error }) => {
  if (!error) return null;
  if(error == null) return null;
  return <NotificationStore title={'ERROR'} message={error} type={'danger'}/>;
 
};

export default NotificationError;