import React, { useState, useEffect } from "react";

import { USER_GET_PHOTO, TOKEN_POST, USER_DATE } from "../api";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../Hooks/useLocalStorage";
import NotificationError from "../Components/Notification/NotificationError";
import NotificationSucess from "../Components/Notification/NotificationSucess";


export const UserContext = React.createContext();
export const UserStorage = ({ children }) => {
  const [sessionLocalStorage, setSessionLocalStorage] = useLocalStorage('session', null);
  const [idLocalStorage, setIDLocalStorage] = useLocalStorage('idUser', null);
  const [data, setData] = useState([]);
  const [session, setSession] = useState();
  const [sideMenu, setSideMenu] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  function OpenCloseMenu(props) {
    setSideMenu(props);
  }


  useEffect(() => {
    if(sessionLocalStorage != 'null' && idLocalStorage != 'null'){
     getUser(sessionLocalStorage, idLocalStorage);
     getPhoto(sessionLocalStorage, idLocalStorage);
     setSession(sessionLocalStorage);
     setLogin(true);
    }
  },[]);
  


  const userLogout = React.useCallback(
    async function () {
      setSession(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      localStorage.clear();
      history.push("/");
    },
    []
  );

    async function getUser(session, id) {
      const { url, options } = USER_DATE(session, id);
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error == false) {
        setData(json.data);
      } else {
        setError(json.message);
        setLogin(false);
      }
    }
  
    async function getPhoto(session, id) {
      const { url, options } = USER_GET_PHOTO(session, id);
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error == false) {
        setUserPhoto(json.photo);
        setLogin(true)
        history.push("/home")
      } else {
        setError(json.message);
        setLogin(false);
      }
    }
  


async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({
        'user': username,
        'password': password,
      });
      const tokenRes = await fetch(url, options);
      const json = await tokenRes.json();
      if (json.error == true) throw new Error(json.message);
      setSession(json.data.session);
      setSessionLocalStorage(json.data.session);
      setIDLocalStorage(json.data.id);
      getPhoto(json.data.session, json.data.id);
      getUser(json.data.session, json.data.id);
    }
    catch (error) {
      setError(error.message);
      setLogin(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, userPhoto, session, data, error, loading, login, OpenCloseMenu, sideMenu }}
    >
      {children}
    </UserContext.Provider>
  );
};