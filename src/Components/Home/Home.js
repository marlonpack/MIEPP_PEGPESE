import React from 'react';
import Header from '../Header/Header';
import NavContainer from '../Nav/NavContainer';
import styles from './Home.module.css';

function Home() {
  return <div className={StyleSheet.container}>
    <Header />
    <div className={styles.containerContent}>
      <div className={styles.nav}>
        <NavContainer />
      </div>
      <div className={styles.content}>
        home
      </div>
    </div>

  </div>
}


export default Home;