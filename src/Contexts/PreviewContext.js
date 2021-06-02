import React, { useState, useEffect } from "react";

import {
  GET_SHOP_DEPARTMENT,
  GET_PREVIEW_SCREEN,
  GET_MEDIA_FILE,
  APLICATIONEXECUTION_GETPRODUCTLIST
} from "../api";
import { useHistory } from "react-router-dom";
import NotificationError from "../Components/Notification/NotificationError";
import NotificationSucess from "../Components/Notification/NotificationSucess";
import { UserContext } from "./UserContext";

export const PreviewContext = React.createContext();
export const PreviewStorage = ({ children }) => {

  const userContext = React.useContext(UserContext);
  const [dataDepartment, setDataDepartment] = React.useState([]);
  const [dataShop, setDataShop] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [productList, setProductList] = React.useState([0]);
  const [file, setFile] = React.useState(0);
  const [nextScreen, setNextScreen] = React.useState(0);
  const [caughtAt, setCaughtAt] = React.useState(0);
  const[durationSeconds,setDurationSeconds] = React.useState(0);
  const[startAtSeconds,setStartAtSeconds] = React.useState(0);
  const[shop,setShop] = React.useState('');
  const[department,setDepartment] = React.useState(0);


  // useEffect(() => {
  //   getShopDepartment();
  // }, []);

  async function getShopDepartment() {
    try {
      setLoading(true);
      const { url, options } = GET_SHOP_DEPARTMENT(userContext.session);
      const response = await fetch(url, options);
      const json = await response.json();
      console.log('dept', userContext.session)
      let departamento = [];
      let shop = [];
      for (let i = 0; json.data.length > i; i++) {
        if (json.data[i].external_index_description.includes(" departamento"))
          departamento.push(json.data[i]);
        else if (json.data[i].external_index_description.includes(" loja "))
          shop.push(json.data[i]);
      }
      setDataDepartment(departamento);
      setDataShop(shop);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getverify(shop, departament) {
    try {
      setLoading(true);
      const { url, options } = GET_PREVIEW_SCREEN(shop, departament);
      const response = await fetch(url, options);
      const json = await response.json();


      if (json.error) {
        setError(json.message);
        return
      }
      if(json.data.next_screen_seconds != nextScreen){
        setNextScreen(json.data.next_screen_seconds)
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   let time = setInterval(()=>{
  //     let timer = (new Date().getHours() * 3600) + (new Date().getMinutes() * 60) + (new Date().getSeconds());
  //     let ping =0;
      
  //     ping = ping +1

  //     if(ping ===300){
  //       getverify(shop, department)
  //       return ping =0;
  //     }
  //     if((timer + caughtAt) == (nextScreen) && caughtAt != undefined && nextScreen != undefined ){
  //       setFile(undefined)
  //       setDurationSeconds(undefined)
  //       getdados(shop, department)
  //     }

  //     if (((timer) + caughtAt) == (startAtSeconds + durationSeconds) && durationSeconds != undefined) {
  //       setFile(undefined)
  //       setDurationSeconds(undefined)
  //       getdados(shop, department)
  //     }
  //   })
    


  //   return () => {
  //     clearInterval(time)
  //   };
  // });

  async function getdados(shop, departament) {
    setProductList([])
    setFile(0)
    setDepartment(departament)
    setShop(shop)
    try {
      setLoading(true);
      const { url, options } = GET_PREVIEW_SCREEN(shop, departament);
      const response = await fetch(url, options);
      const json = await response.json();


      if (json.error) {
        setError(json.message);
        return
      }
      let timer = (new Date().getHours() * 3600) + (new Date().getMinutes() * 60) + (new Date().getSeconds());
      setCaughtAt(json.data.caught_at_seconds - timer)
      setNextScreen(json.data.next_screen_seconds)
      setDurationSeconds(json.data.duration_seconds)
      setStartAtSeconds(json.data.starts_at_seconds)
      if ((json.data.caught_at_seconds - timer) + timer >= (json.data.starts_at_seconds) && (json.data.caught_at_seconds - timer) + timer <= (json.data.starts_at_seconds + json.data.duration_seconds)) {
        getMediaFile(json.data.media_id)
        productList != undefined && setProductList(undefined)
        json.data.type == 0 && getProduct(shop, json.data.screen_id)
      }else{
        setError('nenhuma tela existe no momento')
      }
      // console.log(json)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

 async function getMediaFile(id){
    try {
      setLoading(true);
      const { url, options } = GET_MEDIA_FILE(userContext.session, id);
      const response = await fetch(url, options);
      const json = await response.json();


      // console.log(json);
      setFile(json.data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }


  async function getProduct(shop, screen_id){
    try {
      setLoading(true);
      const { url, options } = APLICATIONEXECUTION_GETPRODUCTLIST(shop, screen_id);
      const response = await fetch(url, options);
      const json = await response.json();

      // console.log(json);
      setProductList(json.data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PreviewContext.Provider
      value={{ dataDepartment, dataShop, loading, getShopDepartment, getdados, file, productList, nextScreen, getverify, caughtAt, error, setFile, setProductList }}
    >
      {children}
    </PreviewContext.Provider>
  );
};