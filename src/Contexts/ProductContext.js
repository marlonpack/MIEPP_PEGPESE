import React from "react";
import {
  GET_PRODUCT,
  GET_PRODUCTSCREEN,
  POST_PRODUCTSCREEN,
  DELETE_PRODUCTSCREEN,
} from "../api";
import { UserContext } from "./UserContext";
import { ScreenContext } from "./ScreenContext";
import NotificationSucess from "../Components/Notification/NotificationSucess";


export const ProductContext = React.createContext();

export const ProductStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const screenContext = React.useContext(ScreenContext);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [dataProductImg, setDataProductImg] = React.useState([]);
  const [produtList, setProductList] = React.useState([]);

  function OpenModalProduct(modal) {
    setOpenModal(modal)

    if(modal ==false){
      setDataProductImg([])
      setProductList([])
    }
  }

  React.useEffect(() => {
    if(produtList != '') setDataProductImg([...dataProductImg, produtList])
  }, [produtList]);


  async function ListProductTable(data) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = POST_PRODUCTSCREEN(userContext.session, {
        screen_id: screenContext.dataEdit.id,
        product_id: data.id,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json)
      if (json.error) {
        setError(json.message);
      }
      if (response.ok) {
        if(json.message !== ('Value alredy exists')){
          NotificationSucess('Produto Inserido Com Sucesso');
           setDataProductImg([...dataProductImg, data])
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }


  }


  async function RemoveListProductTable(data, index) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = DELETE_PRODUCTSCREEN(userContext.session, {
        screen_id: screenContext.dataEdit.id,
        product_id: data.id,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json)
      if (json.error) {
        setError(json.message);
      }
      if (response.ok) {
        NotificationSucess('Produto removido Com Sucesso');
        let listProduct = [...dataProductImg];
        listProduct.splice(index, 1);
        setDataProductImg([...listProduct])
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
      if (response.ok) {
        setData(json.data);
        GetListProduct(json.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function GetListProduct(data) {
    try {
      setError(null);
      setLoading(true);
      console.log(screenContext.dataEdit.id)
      const { url, options } = GET_PRODUCTSCREEN(userContext.session, screenContext.dataEdit.id);
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error) {
        setError(json.message);
      }
      if (response.ok) {
        for (let i = 0; data.length > i; i++) {
          for (let j = 0; json.data.length > j; j++) {
            if (data[i].id == json.data[j].product_id) {
              setProductList(data[i])
            }
          }
        }
      }

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
        produtList,
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
