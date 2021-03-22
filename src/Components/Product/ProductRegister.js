import React from 'react';
import { ProductContext } from '../../Contexts/ProductContext';
import { ScreenContext } from '../../Contexts/ScreenContext';
import Input from '../Forms/Input';
import styles from "./ProductRegister.module.css";

function ProductRegister({ department }) {
  const { dataShop, dataDepartment } = React.useContext(ScreenContext);
  const { GetProduct } = React.useContext(ProductContext);
  const [selectShop, setSelectShop] = React.useState('1');
  const [shop, setShop] = React.useState(dataShop);

  function HandleChange(value) {
    setSelectShop(value)
    GetProduct(department, value);
  }

  React.useEffect(() => {


    let arrayTest= []
    for (let i = 0; dataDepartment.length > i; i++) {
      if(department.id === parseInt(dataDepartment[i].id)){
        if (dataDepartment[i].description.indexOf('(') > -1) {
       
        let tes = dataDepartment[i].description.split('(')
        let remove = tes[1].replace(/\s/g, '').replace(')','').split(',')
        arrayTest.push(...remove)
      }}
    }
    
    if(arrayTest.length>0){
      let company=[]
    for(let a=0; dataShop.length> a; a++){
      for(let b=0; arrayTest.length> b; b++){
     
        if (dataShop[a].description.replace(/\s/g, '').indexOf(arrayTest[b])> -1){
          company.push(dataShop[a])
        }
      }
    }
    setShop(company)
  }
}, [])


  return (
    <div className={styles.divSelect}>
      <div className={styles.divSelectLeft}>
        <label>Loja:</label>
        <select
          onChange={({ target }) => HandleChange(target.value)}
          value={selectShop}
        >
          {shop.map((data, index) => (<option key={index} value={data.external_index}>{`${data.id} - ${data.description}`}</option>))}
        </select>
      </div>
      <div className={styles.divSelectRight}>
        <label>Cor da lista principal:</label>
        <Input type='color' />
        <label>Cor da lista promoções:</label>
        <Input type='color' />
      </div>
    </div>
  )
}



export default ProductRegister;