import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { ProviderContext } from "../../Contexts/ProviderContext";
import { MediaContext } from "../../Contexts/MediaContext";
import { ScreenContext } from "../../Contexts/ScreenContext";
import { Route, Navigate, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { NotificationStore } from "../Notification/StoreNotification";



const ProtectedRoute = (props) => {
  const userContext = useContext(UserContext);
  const provider = useContext(ProviderContext);
  const media = useContext(MediaContext);
  const screen = useContext(ScreenContext);
  // const [loginPage, setLoginPage] = useLocalStorage('login', login);
  const history = useHistory();

  if (provider.error == 'Authorization denied' || media.error == 'Authorization denied' || screen.error == 'Authorization denied') {
    NotificationStore('Aviso','Autorização negada, recarregue a pagina e faça login novamente', 'warning')
    userContext.userLogout();
    return <Redirect to='/' />
  }


  else if (userContext.login) return <Route {...props} />;
  // else if (loginPage ==='true') {
  //   return null;
  // }

  else if (!userContext.login) {

    return <Redirect to='/' />
  }

  else return null;

};

export default ProtectedRoute;