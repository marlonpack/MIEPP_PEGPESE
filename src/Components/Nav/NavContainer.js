import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import styles from './NavContainer.module.css';
import { UserContext } from '../../Contexts/UserContext';


function NavContainer() {
  const { sideMenu } = useContext(UserContext);
  const [subMenu, setSubmenu] = useState();
  const [submenuConfig, setSubmenuConfig] = useState();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    
    if (!location.pathname.includes('/home/cadastro/')) {setSubmenu(false)}
    else if (location.pathname.includes('/home/cadastro/')) {
      setSubmenu(true)
    }else  if (location.pathname.includes('/home/cadastro')){
      setSubmenu(true)
      history.push('/home/cadastro/fornecedor')
    }
    if (!location.pathname.includes('/home/configuracao/')) {setSubmenuConfig(false)}
    else if (location.pathname.includes('/home/configuracao/')) {
      setSubmenuConfig(true)
      // history.push('/home/configuracao/timeline')
    }

  }, [location.pathname]);


  return <div className={sideMenu === true ? styles.container : styles.CloseContainer}>
    <NavLink to={subMenu ? '/home/cadastro' : '/home/cadastro/fornecedor'} activeClassName={styles.active} onClick={() => setSubmenu(true)}>Cadastro</NavLink>
    {subMenu && <div className={styles.subMenuRegister}>
      <NavLink activeClassName={styles.active} to='/home/cadastro/fornecedor' >Fornecedor</NavLink>
      <NavLink activeClassName={styles.active} to='/home/cadastro/midia'>Midia</NavLink>
      <NavLink activeClassName={styles.active} to='/home/cadastro/screen'>Screen</NavLink>
    </div>}
    <NavLink to={submenuConfig ? '/home/configuracao' : '/home/configuracao/timeline'} activeClassName={styles.active} onClick={() => setSubmenuConfig(true)}>Configuração</NavLink>
    {submenuConfig && <div className={styles.subMenuRegister}>
      <NavLink activeClassName={styles.active} to='/home/configuracao/timeline' >Timeline</NavLink>
      <NavLink activeClassName={styles.active} to='/home/configuracao/telatimeline'>Telas do Timeline</NavLink>
      <NavLink activeClassName={styles.active} to='/home/configuracao/lojatimeline'>Lojas do Timeline</NavLink>
    </div>}
    <NavLink activeClassName={styles.active} to='/home/preview'>Preview</NavLink>
    <NavLink activeClassName={styles.active} to='/home/relatorio'>Relatório</NavLink>
    <NavLink activeClassName={styles.active} to='/home/status'>Status</NavLink>
  </div>
}


export default NavContainer;