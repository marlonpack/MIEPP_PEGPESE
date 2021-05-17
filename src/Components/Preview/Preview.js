import React from "react";
import Loading from "../Loading/Loading";
import { PreviewContext } from "../../Contexts/PreviewContext";
import styles from "./Preview.module.css";
import Teacher2 from "./3_BGTest.jpg"

const Preview = () => {
  const { dataDepartment, dataShop, getShopDepartment, getdados, file, productList, nextScreen, getverify, caughtAt } = React.useContext(PreviewContext);
  const [department, setDepartment] = React.useState(0);
  const [shop, setShop] = React.useState(0);

  React.useEffect(() => {
    getShopDepartment();
  }, []);
  // console.log(productList)

  // console.log(file != 0&& String(file).includes('video'))
  React.useEffect(() => {
    let timer = (new Date().getHours() * 3600) + (new Date().getMinutes() * 60) + (new Date().getSeconds());
    let ping =0;

    if((timer-caughtAt) == parseInt(nextScreen)&& shop!=0 && department!=0){
      getdados(shop, department)
    }
    setInterval(()=>{
      ping = ping+1

      if(ping == 300 && shop!=0 && department!=0){
        // console.log(shop, department)
        getverify(shop, department)
        return ping =0
      }
    },1000)
  });




  function handleClick() {
    getdados(shop, department);
  }

  return (
    <div>
      <div className={styles.divHeader}>
        <p className={styles.p}>Loja:</p>
        <select
          onChange={({ target }) => setShop(target.value)}
          value={shop}
          className={styles.select}
        >
          <option value={0}>
            select
          </option>
          {dataShop.map((data, index) => (
            <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
          ))}
        </select>

        <p className={styles.p}>Departamento:</p>
        <select
          onChange={({ target }) => setDepartment(target.value)}
          value={department}
          className={styles.select}
        >
          <option value={0}>
            select
          </option>
          {dataDepartment.map((data, index) => (
            <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
          ))}
        </select>

        <button onClick={() => handleClick()} className={styles.button}>teste</button>
      </div>
      <div className={styles.divImg}>
        {(file != 0 && (String(file).includes('video')) ?
           <video src={`${file}`} />
          : file != 0 && (String(file).includes('image')) ?<img src={`${file}`} />: '')
        }
        {/* <img src={`${file}`} /> */}
           {/* <img src={Teacher2} /> */}
      </div>
      <div className={styles.divProduct}>
        <table className={styles.table}>
          <tbody>
            {productList > 0 || productList !== undefined && (

              productList.map((data, index) => (
                data.price_promo != 0 ?
                  <tr style={{ color: 'red' }} key={index} >
                    <td>{data.id}</td>
                    <td>{data.description}</td>
                    <td>{data.price_promo}</td>
                  </tr> :
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.description}</td>
                    <td>{data.price}</td>
                  </tr>
              // console.log(data)
              )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Preview;

