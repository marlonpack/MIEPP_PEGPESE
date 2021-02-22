import React from 'react';
import styles from './Product.module.css';
import ProductRegister from './ProductRegister';
import ProductTable from './ProductTable';
import { ProductContext } from '../../Contexts/ProductContext';
import useOutsideClick from "../../Hooks/useOutsideClick";

function Product() {
  const{openModal, OpenModalProduct} = React.useContext(ProductContext);

    let domNode = useOutsideClick(() => {
      OpenModalProduct(!openModal)
    });


  return (
    <div className={styles.containerProduct}>
      <div ref={domNode} className={styles.modalProduct}>
      {/* <div  className={styles.modalProduct}> */}
        <div className={styles.ProductMenuLeft}>
         <ProductRegister/>
          <div className={styles.divImage}>
            imagem
        </div>
        </div>
        <div className={styles.ProductMenuRight}>
          <ProductTable/>
        </div>
      </div>
    </div>
  )
}


export default Product;