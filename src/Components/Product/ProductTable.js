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
  const [typeSearch, setTypeSearch] = React.useState('');
  // const [openEdit, setOpenEdit] = React.useState(false);


  React.useEffect(() => {

    GetProduct(department, '1');
    // GetListProduct()
  }, []);

  // React.useEffect(() => {
  //   const filter = data.filter((data) =>
  //     data.description.toLowerCase().includes(props.filterScreen)
  //   );
  //   setFilterData([...filter])
  // }, [props]);

  
  function searchScreen(name) {
    if (typeSearch === "") {
      setFilterData([]);
      return;
    }
    let filter = [];

    switch (typeSearch) {
      case 'id':
        filter = data.filter((product) =>
          String(product.id).toLowerCase().includes(name.toLowerCase())
        );
        break;
      case 'description':
        filter = data.filter((product) =>
          product.description.toLowerCase().includes(name.toLowerCase())
        );
        break;
      case 'price':
        filter = data.filter((product) =>
          product.price.toLowerCase().includes(name.toLowerCase())
        );
        break;
      case 'promo':
        filter = data.filter((product) =>
          product.price_promo.toLowerCase().includes(name.toLowerCase())
        );
        break;

    }

    setFilterData([...filter])
  }



  function orderProviders(order) {
    const filter = [...data];
    switch (order) {
      case "id":
        filter.sort(function (a, b) {
          if (a.id > b.id)
            return 1;
          if (a.id < b.id)
            return -1;
          return 0;
        });
        break;
      case "description":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "price":
        filter.sort(function (a, b) {
          return a.price.localeCompare(b.price);
        });
        break;
      case "promo":
        filter.sort(function (a, b) {
          return b.price_promo.localeCompare(a.price_promo);
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
          <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="id">Código</option>
            <option value="description">Descrição</option>
            <option value="price">Preço</option>
            <option value="promo">Preço promoção</option>
          </select>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar:"
            type="text"
            id="searchScreen"
            name="searchScreen"
            onChange={({ target }) => { searchScreen(target.value) }}
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
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("price")} />
              </span>
            </th>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("promo")} />
              </span>
            </th>
          </tr>
        </thead>

        {data !== undefined ? (<tbody>
          {filterData.length > 0 ? filterData.map((data) => (
            <tr key={data.id} onClick={() => { ListProductTable(data) }}>
              <td>{data.id}</td>
              <td>{data.description}</td>
              <td>{data.price}</td>
              <td>{data.price_promo}</td>
            </tr>
          )) :
            (data.map((data) => (
              <tr key={data.id} onClick={() => { ListProductTable(data) }}>
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