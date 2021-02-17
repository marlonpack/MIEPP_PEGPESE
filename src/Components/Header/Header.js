import React, { useEffect, useContext, useState, useRef } from 'react';
import styles from './Header.module.css'
import { ReactComponent as Menu } from '../../Assets/menu-24px.svg'
import { UserContext } from '../../UserContext';
import ModalHeader from './ModalHeader';
import useOutsideClick from '../../Hooks/useOutsideClick';

function Header() {
  const { userPhoto, OpenCloseMenu, sideMenu, data } = useContext(UserContext);
  const [modalUser, setModalUser] = useState('none');
  const modalRef = useRef();

  useOutsideClick(modalRef, () => {
    if (modalUser) setModalUser(false)
  });



  return (
    <div className={styles.container}>
      <Menu onClick={() => { OpenCloseMenu(!sideMenu) }} />
      {modalUser == true ? <ModalHeader modalRef={modalRef} /> : ''}
      <button className={styles.buttonImg} onClick={() => { setModalUser(!modalUser) }}>
        <img src={"data:image/jpeg;base64," + userPhoto} className={styles.imageUser} />
      </button>
    </div>
  )
}

export default Header;