import React from 'react';
import styles from './Product.module.css';
import ProductRegister from './ProductRegister';
import ProductTable from './ProductTable';
import { ProductContext } from '../../Contexts/ProductContext';
import useOutsideClick from "../../Hooks/useOutsideClick";
import { convertBase64 } from "../../utils/base64";

function Product({media, department}) {
  const{openModal, OpenModalProduct} = React.useContext(ProductContext);
  const [image, setImage] = React.useState('');

  console.log(media)

    let domNode = useOutsideClick(() => {
      OpenModalProduct(!openModal)
    });

    // React.useEffect(async ()=>{
    //   const base = await convertBase64(media.file);
    //   //  setImage(base)
    //   console.log(base)
    // },[media])
  

  return (
    <div className={styles.containerProduct}>
      <div ref={domNode} className={styles.modalProduct}>
      {/* <div  className={styles.modalProduct}> */}
        <div className={styles.ProductMenuLeft}>
         <ProductRegister department={department}/>
          <div className={styles.divImage}>
            <img src={media.file} width='100%' height='100%'/>
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