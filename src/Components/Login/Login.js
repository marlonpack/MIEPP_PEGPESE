import React, { useEffect, useRef, useState } from 'react';
import styles from './Login.module.css'
import logo from '../../Assets/logo.png'
import mippLogotipo from '../../Assets/MIPP_logo.png'
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../Contexts/UserContext';
import Modal from './ModalPassword'
import NotificationError from '../Notification/NotificationError';


function Login() {

  const username = useForm();
  const password = useForm();
  const {login, userLogin, error } = React.useContext(UserContext);
  // const [changePassword, setChangePassword] = useState(false)
  // const [useLogin, setUseLogin]= useState(false)

  useEffect(() => {
    if (error != 'Authorization denied'){
      NotificationError(error)
    }
  }, [error]);


  // useEffect(() => {
  //   if(login == true) NotificationSucess('Login feito com sucesso')
  // }, [login]);

  function handleSubmit(e) {
    e.preventDefault();
    userLogin(username.value, password.value);
    // NotificationError(error)
    // login? setUseLogin(true): ''
  }



  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.applicationName} >MIEPP</h2>
        <img className={styles.img} src={logo} alt='logo pegPese' />
        <h1 className={styles.login}>Login</h1>
        <form >
          <Input style={styles.input} label="Usuário" type="text" name="username" {...username} />
          <Input style={styles.input} label="Senha" type="password" name="password" {...password} />
          <div className={styles.divButton}> <Button style={styles.button} onClick={(e) => handleSubmit(e)}>Entrar</Button> </div>
        </form>
      </div>
      <div className={styles.divisor} />
      <div className={styles.ArtSection}>
        <img className={styles.img} src={mippLogotipo} alt="" />
      </div>

      {error === ('Default password is not permited') ? 
      <Modal username={username.value} password={password.value} /> : ''}

    </div>
  );
}


export default Login;