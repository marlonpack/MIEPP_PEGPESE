import React from "react";
import {
  GET_SHOP_DEPARTMENT,
  GET_SCREEEN,
  POST_SCREEEN,
  PUT_SCREEEN,
  DELETE_SCREEEN,
} from "../api";

import { UserContext } from "./UserContext";

export const ScreenContext = React.createContext();

export const ScreenStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState([]);
  const [dataShop, setDataShop] = React.useState([]);
  const [dataDepartment, setDataDepartment] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openEditScreen, setOpenEditScreen] = React.useState(false);


  async function loadScreen() {
    setOpenEditScreen(false);
    setDataEdit([])
    try {
      const { url, options } = GET_SCREEEN(userContext.session)
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw new Error(`Error: ${json.message}`);
      if (response.ok) setData(json.data);
      getShopDepartment();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getShopDepartment(){
    try{
      const {url, options}= GET_SHOP_DEPARTMENT(userContext.session);
      const response = await fetch(url,options);
      const json = await response.json();
      let departamento =[];
      let shop= [];
      for(let i=0; json.data.length>i; i++){
        if(json.data[i].external_index_description.includes(' departamento'))departamento.push(json.data[i])
        else if(json.data[i].external_index_description.includes(' loja '))shop.push(json.data[i])
      }
      setDataDepartment(departamento)
      setDataShop(shop)
    }catch(error){
      console.log(error)
    }
  }


  async function postScreen(description, time, media_id, department_id) {
    try {
      const { url, options } = POST_SCREEEN(userContext.session,{
        description:description,
        time: time,
        media_id: parseInt(media_id),
        department_id: parseInt(department_id),
      })
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw new Error(`Error: ${json.message}`);
      alert(json.message)
      if (response.ok) loadScreen()
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteScreen(params) {
    try {
      const { url, options } = DELETE_SCREEEN(userContext.session,{
        'id': params
       })
      const response = await fetch(url, options);
      const json = await response.json(); 
      if (!response.ok) throw new Error(`Error: ${json.message}`);
      loadScreen();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function putScreen(id, description, time, media_id, department_id) {
    try {
      const { url, options } = PUT_SCREEEN(userContext.session,{
        id: id,
        description:description,
        time: time,
        media_id: media_id,
        department_id: department_id,
       })
      const response = await fetch(url, options);
      const json = await response.json(); 
      if (!response.ok) throw new Error(`Error: ${json.message}`);
      alert(json.message)
      loadScreen();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  function editScreen(data, openEdit){
    setDataEdit(data);
    setOpenEditScreen(openEdit);
  }


  // async function loadProviders() {
  //   try {
  //     setError(null);
  //     setLoading(true);


  //     const { url, options } = GET_PROVIDER(userContext.session);


  //     const response = await fetch(url, options);

  //     const json = await response.json();

  //     if (json.error) {
  //       setError(json.message);
  //     }

  //     if (!response.ok) throw new Error(`Error: ${json.message}`);

  //     if (response.ok) setData(json.data);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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

  // async function updateProvider(name, id) {
  //   try {
  //     setError(null);
  //     setLoading(true);

  //     const { url, options } = PUT_PROVIDER(userContext.session, {
  //       id: id,
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

  // async function deleteProvider(id) {
  //   try {
  //     setError(null);
  //     setLoading(true);

  //     const { url, options } = DELETE_PROVIDER(userContext.session, {
  //       id: id,
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
    <ScreenContext.Provider
      value={{
        data,
        error,
        loading,
        loadScreen,
        postScreen,
        deleteScreen,
        editScreen,
        setOpenEditScreen,
        putScreen,
        dataEdit,
        openEditScreen,
        dataDepartment,
        dataShop
        // createProvider,
        // updateProvider,
        // deleteProvider,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
