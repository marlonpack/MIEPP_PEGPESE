import React from 'react';
import { ScreenContext } from '../../Contexts/ScreenContext';
import Input from '../Forms/Input';
import styles from "./ProductRegister.module.css";

function ProductRegister(params) {
  const{dataShop} = React.useContext(ScreenContext)


  return(
    <div className={styles.divSelect}>
    <div className={styles.divSelectLeft}>
    <label>Loja:</label>
    <select>
    {dataShop.map((data)=>(<option key={data.id} value={data.external_index}>{`${data.id} - ${data.description}`}</option>))}
    </select>
    </div>
    <div className={styles.divSelectRight}>
      <label>Cor da lista principal:</label>
      <Input/>
      <label>Cor da lista promoções:</label>
      <Input/>
    </div>
  </div>
  )
}



export default ProductRegister;