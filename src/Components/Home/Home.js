import React, { useContext } from "react";
import { Route, Routes, Switch, useHistory, BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import NavContainer from "../Nav/NavContainer";
import Provider from "../Provider/Provider";
import styles from "./Home.module.css";

import { UserContext } from '../../Contexts/UserContext';
import Media from "../Media/Media";
import Screen from "../Screen/Screen";


function Home(props) {

  const { error, login, sideMenu } = useContext(UserContext);
  const history = useHistory();



  return (

    <div className={styles.container}>
      <Header />
      <div className={styles.containerContent}>
        <div className={sideMenu ? styles.nav : styles.navClose}>
          <NavContainer />
        </div>
        <div className={sideMenu ? styles.content : styles.contentClose}>

          <Switch>
            <Route path={`${props.match.path}/cadastro/fornecedor`} component={Provider} />
            <Route path={`${props.match.path}/cadastro/midia`} component={Media} />
            <Route path={`${props.match.path}/cadastro/screen`} component={Screen} />
           </Switch> 

        </div>
      </div>
    </div>
  );

}



export default Home;
