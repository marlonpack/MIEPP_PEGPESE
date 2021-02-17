import React, { useContext, useRef } from 'react';
import { UserContext } from '../../UserContext';
import styles from './ModalHeader.module.css'
import Button from '../Forms/Button'

function ModalHeader(props) {
  const { userPhoto, data } = useContext(UserContext);
  const { modalRef} = props;

  

  return (
    <div ref={modalRef}  className={styles.container} >
      <div className={styles.containerImg}>
        <img className={styles.image} src={"data:image/jpeg;base64," + userPhoto} />
      </div>
      <div>
        <h3 className={styles.containerName}> <strong>{data[0].name}</strong></h3>
        <p className={styles.paragraph}>{data[0].company}-{data[0].shop}</p>
        <p className={styles.paragraph}>{data[0].departament}-{data[0].sub}</p>
        <p className={styles.paragraph}><strong> {data[1].administrator === true ? 'Administrador' : 'Usuário comum'}</strong></p>
        {data[1].administrator === true ? <p className={styles.containerAdmin}>Visualizar como administrador:
    <input className={styles.checkbox} type='checkbox' />
        </p> : ''}
        <Button style={styles.button}>Sair</Button>
      </div>
    </div>
  
  )
}


export default ModalHeader;