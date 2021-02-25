import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export  function NotificationStore(title, message, type){
  return store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    }
  })
}