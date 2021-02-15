import React, { useState } from "react";

import {USER_GET_PHOTO, TOKEN_POST } from "../src/api";
import { useHistory } from "react-router-dom";


export const UserContext = React.createContext();
export const UserStorage = ({ children }) => {
  const [data, setData] = useState();
  const [photo, setPhoto] = useState();
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();


  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      history.push("/");
    },
    []
  );


  async function getUser(session, id) {
    const { url, options } = USER_GET_PHOTO(session, id);
    const response  = await fetch(url, options);
    const json = await response.json();
    if(json.error ==false) 
    { console.log(json);
      setPhoto(json.photo) 
      history.push("/home")
    }else{
      alert(json.message);
      console.log(json.message);
    }
    // if(photo!=undefined)  ;
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
      setData(json.data);
      getUser(json.data.session, json.data.id);
      console.log(json);
      // if (json.error === true) setError(json.message)
    }
    catch (err) {
      setError(err.message);
      setLogin(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, photo, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};