import React, { useCallback, useContext, useRef, useState } from 'react';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import style from './ModalPassword.module.css'
import useFetch from '../../Hooks/useFetch'
import { PUT_PASSWORD } from '../../api';
import { UserContext } from '../../UserContext';




function Modal(user) {

  const [dropdown, setDropdown] = useState("flex");
  const modalRef = useRef(null);
  const password = useForm('password');
  const confirmPassword = useForm();
  const { loading, error, request } = useFetch();
  const { userLogin } = useContext(UserContext);

  const closeDropdown = event => {
    event.stopPropagation();
    const contain = modalRef.current.contains(event.target);
    if (!contain) {
      setDropdown("none");
      document.body.removeEventListener("click", closeDropdown);
    }
  };


  async function handleSubmit(e) {
    e.preventDefault();

    if (password.validate() && password.value === confirmPassword.value) {
      const { url, options } = PUT_PASSWORD({
        'user': user.username,
        'password': user.password,
        'new_password': confirmPassword.value
      });
      const { response } = await request(url, options)
      response.ok ? userLogin(user.username, confirmPassword.value) : alert(error);
    } else {
      alert(password.error, confirmPassword.value)
    }
  }

  return (
    <div onClick={closeDropdown} style={{ display: dropdown }} className={`${style.modal}`}>
      <div ref={modalRef} className={style.internal}>
        <div className={style.divh2}><h2>Redefina sua senha</h2></div>
        <form className={style.divelement} onSubmit={handleSubmit}>
          <Input readonly='readonly' style={style.teste} type="text" name="username" defaultValue={user.username} label='Usuário' />
          <Input readonly='readonly' style={style.teste} type="password" name="password" defaultValue={user.password} label='Senha antiga' />
          <Input style={style.teste} type="password" label='Nova Senha' {...password} />
          <Input style={style.teste} type="password" label='Confirmar senha' {...confirmPassword} />
          <Button style={style.button}>Confirmar</Button>
        </form>
      </div>
    </div>
  )
}


export default Modal;