import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export function NotificationStore(){
  store.addNotification({
    title: "ERRO!",
    message: 'error',
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    }
  })
}