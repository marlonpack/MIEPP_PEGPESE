import React from "react";
import {
  GET_PRODUCT,
  POST_PROVIDER,
  PUT_PROVIDER,
  DELETE_PROVIDER,
} from "../api";
import { UserContext } from "./UserContext";

export const ProductContext = React.createContext();

export const ProductStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);


  function OpenModalProduct(modal){
    setOpenModal(modal)
  }  

  async function GetProduct() {
    try {
      setError(null);
      setLoading(true);


      const { url, options } = GET_PRODUCT(userContext.session,'1','1');
      const response = await fetch(url, options);
      const json = await response.json();
     
      if (json.error) {
        setError(json.message);
      }

      // if (!response.ok) throw new Error(`Error: ${json.message}`);

      if (response.ok) setData(json.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // async function createProvider(name) {
  //   try {
  //     setError(null);
  //     setLoading(true);

  //     const { url, options } = POST_PROVIDER(userContext.session, {
  //       description: name,
  //     });

  //     const response = await fetch(url, options);

  //     const json = await response.json();

  //     if (json.error) {
  //       setError(json.message);
  //     }

  //     if (!response.ok) throw new Error(`Error: ${json.message}`);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //     loadProviders();
  //   }
  // }




  return (
    <ProductContext.Provider
      value={{
        data,
        error,
        loading,
        openModal,
        GetProduct,
        OpenModalProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
