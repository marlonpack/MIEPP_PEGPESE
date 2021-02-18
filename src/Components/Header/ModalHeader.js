import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import styles from './ModalHeader.module.css'
import Button from '../Forms/Button'

import useOutsideClick from '../../Hooks/useOutsideClick';
import YesNoModal from '../YesNoModal/YesNoModal'


function ModalHeader({close}) {
  const {userLogout, userPhoto, data } = useContext(UserContext);
  const [modalExit, setModalExit] = useState(false);
 

let domNode= useOutsideClick(()=>{
  close();
})
  
function closed(){
  userLogout()
}

  

  return (
    <div ref={domNode}  className={styles.container} >
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
        <Button style={styles.button} onClick={() => { setModalExit(!modalExit) }}>Sair</Button>
      </div>
      {modalExit && (<YesNoModal question="Tem certeza que deseja sair?" action={()=> closed(closed)} close={()=>setModalExit(false)}/> )}
    </div>
  
  )
}


export default ModalHeader;