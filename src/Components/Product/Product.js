import React from 'react';
import styles from './Product.module.css';
import ProductRegister from './ProductRegister';
import ProductTable from './ProductTable';
import { ProductContext } from '../../Contexts/ProductContext';
import useOutsideClick from "../../Hooks/useOutsideClick";
import { convertBase64 } from "../../utils/base64";

function Product({ media, department }) {
  const { openModal, OpenModalProduct, dataProductImg, RemoveListProductTable, GetListProduct } = React.useContext(ProductContext);
  const [image, setImage] = React.useState('');


  React.useEffect(()=>{
    GetListProduct()
  },[])

  console.log(media)
  console.log(dataProductImg)

  let domNode = useOutsideClick(() => {
    OpenModalProduct(!openModal)
  });

  React.useEffect(async () => {
    if (media != null) setImage(media.file)
  }, [media])


  return (
    <div className={styles.containerProduct}>
      <div ref={domNode} className={styles.modalProduct}>
        {/* <div  className={styles.modalProduct}> */}
        <div className={styles.ProductMenuLeft}>
          <ProductRegister department={department} />
          <div className={styles.divImage} style={{ backgroundImage: `url(${image})`, backgroundSize: '100% 100%' }}>
            {/* <img src={image} width='100%' height='100%'/> */}
            <div className={styles.tableProductInsert}>
              <table>
                <tbody>
                  {dataProductImg.map((data, index)=>(
                    <tr key={index} onClick={()=>{RemoveListProductTable(index)}}>
                      <td>{data.id}</td>
                      <td>{data.description}</td>
                      <td>{data.price}</td>
                    </tr>
                     ))} 
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles.ProductMenuRight}>
          <ProductTable department={department} />
        </div>
      </div>
    </div>
  )
}


export default Product;