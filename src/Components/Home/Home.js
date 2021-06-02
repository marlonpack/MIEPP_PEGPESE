import React, { useContext, useEffect } from 'react';
import {
  Route,
  Routes,
  Switch,
  useHistory,
  BrowserRouter,
} from 'react-router-dom';
import Header from '../Header/Header';
import NavContainer from '../Nav/NavContainer';
import Provider from '../Provider/Provider';
import styles from './Home.module.css';
import MIEPP from '../../Assets/MIEPP.png'
import { UserContext } from '../../Contexts/UserContext';
import Media from '../Media/Media';
import Screen from '../Screen/Screen';
import CreateTimeline from '../CreateTimeline/CreateTimeline';
import ShopTimeLine from '../ShopTimeline/ShopTimeline';
import ConfigTimeline from '../ConfigTimeline/ConfigTimeline';
import Preview from '../Preview/Preview';
import Record from '../Record/Record';
import Status from '../Status/Status';
// import { authenticateUser, connect, getResponse, respons } from '../Status/Service';

function Home(props) {
  const { login, sideMenu, sessionLocalStorage, session } = useContext(UserContext);
  const history = useHistory();


  // useEffect(async () => {
  //   // authenticateUser(sessionLocalStorage);
  //   console.log(session)
  //   // authenticateUser( session)
  //   // // connect();
  //   // // const response = await getResponse();
  //   // console.log(respons)
  //   // console.log(connect())

  // });

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerContent}>
        <div className={sideMenu ? styles.nav : styles.navClose}>
          <NavContainer />
        </div>
        <div className={sideMenu ? styles.content : styles.contentClose}>
          <Switch>
            <Route
              path={`${props.match.path}/cadastro/fornecedor`}
              component={Provider}
            />
            <Route
              path={`${props.match.path}/cadastro/midia`}
              component={Media}
            />
            <Route
              path={`${props.match.path}/cadastro/screen`}
              component={Screen}
            />
            <Route
              path={`${props.match.path}/cadastro/timeline`}
              component={CreateTimeline}
            />
            <Route
              path={`${props.match.path}/configuracao/lojatimeline`}
              component={ShopTimeLine}
            />
            <Route
              path={`${props.match.path}/configuracao/telatimeline`}
              component={ConfigTimeline}
            />
            <Route
              path={`${props.match.path}/preview`}
              component={Preview}
            />

            <Route
              path={`${props.match.path}/relatorio`}
              component={Record}
            />

            <Route
              path={`${props.match.path}/status`}
              component={Status}
            />
          </Switch>
          {/* <ConfigTimeline /> */}
          {/* <Media/> */}
          {/* <div className={styles.containerImg}>
            <p>MIEPP</p>
          <img className={styles.imageHome} src={MIEPP}/>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
