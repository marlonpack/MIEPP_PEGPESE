import React, { useEffect, useContext } from 'react';
import styles from './Header.module.css'
import { ReactComponent as Menu } from '../../Assets/menu-24px.svg'
import { UserContext } from '../../UserContext';

function Header() {
  const { photo, OpenCloseMenu, sideMenu  } = useContext(UserContext);
  return (
    <div className={styles.container}>
      <Menu onClick={()=>{OpenCloseMenu(!sideMenu)}}/>
      <div className={styles.buttonImg}>
        <img src={"data:image/jpeg;base64," + photo} className={styles.imageUser} />
      </div>
    </div>
  )
}

export default Header;