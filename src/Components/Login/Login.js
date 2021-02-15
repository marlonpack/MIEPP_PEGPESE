import React, { useRef, useState } from 'react';
import styles from './Login.module.css'
import logo from '../../Assets/logo.png'
import mippLogotipo from '../../Assets/MIPP_logo.png'
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Modal from './ModalPassword'
import NotificationError from '../Notification/NotificationError';

function Login() {

  const username = useForm();
  const password = useForm();
  const { userLogin, data, error, loading, login } = React.useContext(UserContext);
  

  function handleSubmit(e) {
    e.preventDefault();
    userLogin(username.value, password.value);
  }


  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.applicationName} >MIEPP</h2>
        <img className={styles.img} src={logo} alt='logo pegPese' />
        <h1 className={styles.login}>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />
          <Button style={styles.button} >Entrar</Button>
          <NotificationError error={error} />
        </form>
      </div>
      <div className={styles.divisor} />
      <div className={styles.ArtSection}>
        <img className={styles.img} src={mippLogotipo} alt="" />
      </div>
      {error === ('Default password is not permited') ? <Modal username={username.value} password={password.value}/> : ''}
    </div>
  );
}


export default Login;