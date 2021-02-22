import React from 'react';
import styles from './Product.module.css';
import ProductRegister from './ProductRegister';
import ProductTable from './ProductTable';
import { ProductContext } from '../../Contexts/ProductContext';
import useOutsideClick from "../../Hooks/useOutsideClick";

function Product({media, department}) {
  const{openModal, OpenModalProduct} = React.useContext(ProductContext);

  console.log(media, department)

    let domNode = useOutsideClick(() => {
      OpenModalProduct(!openModal)
    });


  return (
    <div className={styles.containerProduct}>
      <div ref={domNode} className={styles.modalProduct}>
      {/* <div  className={styles.modalProduct}> */}
        <div className={styles.ProductMenuLeft}>
         <ProductRegister department={department}/>
          <div className={styles.divImage}>
            imagem
        </div>
        </div>
        <div className={styles.ProductMenuRight}>
          <ProductTable department={department}/>
        </div>
      </div>
    </div>
  )
}


export default Product;