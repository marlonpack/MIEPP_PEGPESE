import React from 'react';
import styles from './Product.module.css';
import ProductRegister from './ProductRegister';
import ProductTable from './ProductTable';
import { ProductContext } from '../../Contexts/ProductContext';
import useOutsideClick from "../../Hooks/useOutsideClick";
import NotificationError from '../Notification/NotificationError';


function Product({ media, department }) {
  const {error, openModal, OpenModalProduct, dataProductImg, RemoveListProductTable, GetListProduct, produtList } = React.useContext(ProductContext);
  const [image, setImage] = React.useState('');
  const[ dataproductList, setDataproductList] = React.useState([]);

  React.useEffect(()=>{
   NotificationError(error)
  },[error])

  React.useEffect(()=>{
 
    if(produtList != '') setDataproductList([...dataproductList, produtList]);
  },[produtList])

  // React.useEffect(()=>{
  //   setDataproductList([...dataproductList, dataProductImg]);
  // },[dataProductImg])

  let domNode = useOutsideClick(() => {
    OpenModalProduct(!openModal)
  });

  React.useEffect(async () => {
    if (media != null) setImage(media.file)
  }, [media])


  return (
    <div className={styles.containerProduct}>
      <div ref={domNode} className={styles.modalProduct}>
        <div className={styles.ProductMenuLeft}>
          <ProductRegister department={department} />
          <div className={styles.divImage} style={{ backgroundImage: `url(${image})`, backgroundSize: '100% 100%' }}>
            <div className={styles.tableProductInsert}>
              <table>
                {dataProductImg.length> 0? 
                <tbody>
                  { dataProductImg.map((data, index)=>(
                    data.price_promo !=0?
                    <tr style={{color:'red'}} key={index} onClick={()=>{RemoveListProductTable(data, index)}}>
                      <td>{data.id}</td>
                      <td>{data.description && data.description.substr(0, 20) }</td>
                      <td>{data.price_promo}</td>
                    </tr>
                     :
                     <tr key={index} onClick={()=>{RemoveListProductTable(data, index)}}>
                      <td>{data.id}</td>
                      <td>{data.description && data.description.substr(0, 20) }</td>
                      <td>{data.price}</td>
                    </tr>))} 
                </tbody>
                :
               ''
                }
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