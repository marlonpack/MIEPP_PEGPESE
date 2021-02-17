import React, {useContext} from "react";
import Header from "../Header/Header";
import NavContainer from "../Nav/NavContainer";
import Provider from "../Provider/Provider";
import styles from "./Home.module.css";
import { UserContext } from '../../UserContext';

function Home() {
  const { sideMenu} = useContext(UserContext);


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerContent}>
        <div className={sideMenu? styles.nav: styles.navClose}>
          <NavContainer />
        </div>
        <div className={sideMenu? styles.content: styles.contentClose}>
          <Provider/>
        </div>
      </div>
    </div>
  );
}

export default Home;
