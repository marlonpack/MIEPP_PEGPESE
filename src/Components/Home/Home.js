import React, { useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import NavContainer from "../Nav/NavContainer";
import Provider from "../Provider/Provider";
import styles from "./Home.module.css";
import { UserContext } from '../../Contexts/UserContext';
import { render } from "@testing-library/react";
import Media from "../Media/Media";

function Home(props) {
  const { login, sideMenu } = useContext(UserContext);
  const history = useHistory();

  // if(login ) return <Route path="/cadastro/fornecedor"  component={Provider} />

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerContent}>
        <div className={sideMenu ? styles.nav : styles.navClose}>
          <NavContainer />
        </div>
        <div className={sideMenu ? styles.content : styles.contentClose}>

          {/* <Route path="/"  >
            <Route path='cadastro/fornecedor' component={Provider} />
          </Route> */}
          {/* <Provider/> */}
          <Media/>
        </div>
      </div>
    </div>
  );

}

export default Home;
