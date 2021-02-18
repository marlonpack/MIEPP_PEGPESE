import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavContainer.module.css';
import { UserContext } from '../../Contexts/UserContext';


function NavContainer() {
  const { sideMenu } = useContext(UserContext);

  return <div className={sideMenu === true ? styles.container : styles.CloseContainer}>
    <NavLink to=''>Cadastro</NavLink>
    <div className={styles.subMenuRegister}>
      <NavLink to='/home/cadastro/fornecedor'>Fornecedor</NavLink>
      <NavLink to='/home'>Midia</NavLink>
      <NavLink to=''>Screen</NavLink>
    </div>
    <NavLink to=''>Configuração</NavLink>
    <NavLink to=''>Timeline</NavLink>
    <NavLink to=''>Preview</NavLink>
    <NavLink to=''>Relatório</NavLink>
    <NavLink to=''>Status</NavLink>
  </div>
}


export default NavContainer;