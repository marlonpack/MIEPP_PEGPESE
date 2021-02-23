import React from 'react';
import Button from "../Forms/Button";
import Input from '../Forms/Input';
import styles from "./ProductTable.module.css"
import {
  ViewList,
  Search
} from "@material-ui/icons";
import { ProductContext } from '../../Contexts/ProductContext';

function ProductTable({ department }) {
  const { data, GetProduct, ListProductTable, GetListProduct } = React.useContext(ProductContext);
  const [filterData, setFilterData] = React.useState([]);
  // const [dataEdit, setDataEdit] = React.useState([]);
  // const [openEdit, setOpenEdit] = React.useState(false);


  React.useEffect(() => {
    console.log(department)
    GetProduct(department, '1');
    GetListProduct()
  }, []);

  // React.useEffect(() => {
  //   const filter = data.filter((data) =>
  //     data.description.toLowerCase().includes(props.filterScreen)
  //   );
  //   setFilterData([...filter])
  // }, [props]);



  console.log(data)

  function orderProviders(order) {
    const filter = [...data];
    switch (order) {
      case "id":
        filter.sort();
        break;
      case "description":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "time":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "media":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "department":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      default:
        return;
    }

    setFilterData(filter)
  }




  return (
    <>
      <div className={styles.divTopTable}>
        <h1>Lista de produtos:</h1>
        <div className={styles.inputSearch}>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar:"
            type="text"
            id="searchScreen"
            name="searchScreen"
          // onChange={({ target }) => { searchScreen(target.value) }}
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Preço promo</th>
          </tr>
          <tr>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("id")} />
              </span>
            </th>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("description")} />
              </span>
            </th>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("time")} />
              </span>
            </th>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("media")} />
              </span>
            </th>
          </tr>
        </thead>

        {data !== undefined ? (<tbody>
          {filterData.length > 0 ? filterData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.description}</td>
              <td>{data.price}</td>
              <td>{data.price_promo}</td>
            </tr>
          )) :
            (data.map((data) => (
              <tr key={data.id} onClick={()=>{ListProductTable(data)}}>
                  <td>{data.id}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.price_promo}</td>
              </tr>
            )))}
        </tbody>) :
          <tbody>

          </tbody>
        }
      </table>
    </>
  )
}



export default ProductTable;