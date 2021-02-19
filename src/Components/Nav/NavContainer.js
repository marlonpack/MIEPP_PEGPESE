import React, { useContext, useEffect, useState } from 'react';
import { NavLink,  useLocation } from 'react-router-dom';
import styles from './NavContainer.module.css';
import { UserContext } from '../../Contexts/UserContext';


function NavContainer() {
  const { sideMenu } = useContext(UserContext);
  const [subMenu, setSubmenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/home/cadastro')) setSubmenu(false)
  }, [location.pathname]);


  return <div className={sideMenu === true ? styles.container : styles.CloseContainer}>
    <NavLink to={subMenu ? '/home/cadastro' : '/home/cadastro/fornecedor'} activeClassName={styles.active} onClick={() => setSubmenu(true)}>Cadastro</NavLink>
    {subMenu && <div className={styles.subMenuRegister}>
      <NavLink activeClassName={styles.active} to='/home/cadastro/fornecedor' >Fornecedor</NavLink>
      <NavLink activeClassName={styles.active} to='/home/cadastro/midia'>Midia</NavLink>
      <NavLink activeClassName={styles.active} to='/home/cadastro/screen'>Screen</NavLink>
    </div>}
    <NavLink activeClassName={styles.active} to='/home/configuracao'>Configuração</NavLink>
    <NavLink activeClassName={styles.active} to='/home/timeline'>Timeline</NavLink>
    <NavLink activeClassName={styles.active} to='/home/preview'>Preview</NavLink>
    <NavLink activeClassName={styles.active} to='/home/relatorio'>Relatório</NavLink>
    <NavLink activeClassName={styles.active} to='/home/status'>Status</NavLink>
  </div>
}


export default NavContainer;