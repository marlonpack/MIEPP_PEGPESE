import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export  function NotificationStore(props){
 
  return store.addNotification({
    title: props.title,
    message: props.message,
    type: props.type,
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