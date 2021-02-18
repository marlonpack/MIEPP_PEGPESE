import React from "react";
import { NotificationStore } from "./StoreNotification";


const NotificationSucess = (message) => {
  NotificationStore('Sucesso', message, 'success')

}

export default NotificationSucess;