import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavContainer.module.css';


function NavContainer() {
  return <div className={styles.container}>
    <NavLink to=''>Cadastro</NavLink>
    <NavLink to=''>Configuração</NavLink>
    <NavLink to=''>Timeline</NavLink>
    <NavLink to=''>Preview</NavLink>
    <NavLink to=''>Relatório</NavLink>
    <NavLink to=''>Status</NavLink>
  </div>
}


export default NavContainer;