import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Route, Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";


const ProtectedRoute = (props) => {
  const { login } = useContext(UserContext);
  const [loginPage, setLoginPage] = useLocalStorage('login', login);
  const history = useHistory();
  

  if (login) return <Route {...props} />;
  else if (loginPage ==='true') {
    return null;
  }

  else if (!login && !loginPage) {
    history.push("/");
    return null
  }
  else return null;

};

export default ProtectedRoute;