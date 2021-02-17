import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../UserContext';
import styles from './ModalHeaderExit.module.css'
import Button from '../Forms/Button'

function ModalHeaderExit(props) {
  const { userLogout, data } = useContext(UserContext);
  const { modalExitRef } = props;

  const [dropdown, setDropdown] = useState("flex");
  const modalRef = useRef(null);
 

  const closeDropdown = event => {
    // event.stopPropagation();
    // const contain = modalRef.current.contains(event.target);
    // if (!contain) {
    //   setDropdown("none");
    //   document.body.removeEventListener("click", closeDropdown);
    // }
  };


 




  return (
    <div onClick={closeDropdown} style={{ display: dropdown }} className={`${styles.modal}`}>
      <div ref={modalExitRef} className={styles.container} >
        <div>
          <h3 className={styles.containerName}> <strong>{data[0].name}</strong></h3>
          <p className={styles.paragraph}>Deseja sair?</p>
          <Button style={styles.button} onClick={userLogout}>Sim</Button>
          <Button style={styles.button} >Não</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalHeaderExit;