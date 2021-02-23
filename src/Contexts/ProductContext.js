import React from "react";
import {
  GET_PRODUCT,
  GET_PRODUCTSCREEN,
  POST_PRODUCTSCREEN,
  DELETE_PRODUCTSCREEN,
} from "../api";
import { UserContext } from "./UserContext";

export const ProductContext = React.createContext();

export const ProductStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [dataProductImg, setDataProductImg] = React.useState([]);

  function OpenModalProduct(modal) {
    setOpenModal(modal)
  }

  function ListProductTable(data) {
    setDataProductImg([...dataProductImg, data])
  }

  function RemoveListProductTable(data) {
    let listProduct = [...dataProductImg];
    listProduct.splice(data, 1);
      setDataProductImg([...listProduct])
  }


  async function GetProduct(departament, shop) {
    try {
      setError(null);
      setLoading(true);
  

      const { url, options } = GET_PRODUCT(userContext.session, departament, shop);
      const response = await fetch(url, options);
      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }
      if (response.ok) setData(json.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function GetListProduct() {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = GET_PRODUCTSCREEN(userContext.session, userContext.dataEdit.id);
      console.log(url, options)
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(response)
      if (json.error) {
        setError(json.message);
      }
      if (response.ok) console.log(json)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        data,
        error,
        loading,
        openModal,
        dataProductImg,
        GetProduct,
        OpenModalProduct,
        ListProductTable,
        RemoveListProductTable,
        GetListProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
