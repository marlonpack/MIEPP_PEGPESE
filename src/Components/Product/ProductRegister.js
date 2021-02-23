import React from 'react';
import { ProductContext } from '../../Contexts/ProductContext';
import { ScreenContext } from '../../Contexts/ScreenContext';
import Input from '../Forms/Input';
import styles from "./ProductRegister.module.css";

function ProductRegister({department}) {
  const{dataShop} = React.useContext(ScreenContext);
  const{GetProduct} = React.useContext(ProductContext);
  const [selectShop, setSelectShop]= React.useState('1');

  function HandleChange(value){
    setSelectShop(value)
    GetProduct(department, value);
  }

  return(
    <div className={styles.divSelect}>
    <div className={styles.divSelectLeft}>
    <label>Loja:</label>
    <select
     onChange={({ target }) =>  HandleChange(target.value)}
     value={selectShop}
     >
    {dataShop.map((data, index)=>(<option key={index} value={data.external_index}>{`${data.id} - ${data.description}`}</option>))}
    </select>
    </div>
    <div className={styles.divSelectRight}>
      <label>Cor da lista principal:</label>
      <Input type='color'/>
      <label>Cor da lista promoções:</label>
      <Input type='color'/>
    </div>
  </div>
  )
}



export default ProductRegister;