import React from "react";
import { UserContext } from "../../Contexts/UserContext";
import { StatusContext } from "../../Contexts/StatusContext";
import styles from "./Status.module.css";
import { ScreenContext } from "../../Contexts/ScreenContext";
import Loading from "../Loading/Loading";
import NotificationError from "../Notification/NotificationError";
// import { getDevices, getResponse } from './Service';
// import * as ICMP from 'icmp';


const Status = () => {
  const userContext = React.useContext(UserContext);
  const statusContext = React.useContext(StatusContext);
  const screen = React.useContext(ScreenContext);

  React.useEffect(() => {
    statusContext.getStatus();
    screen.getShopDepartment();
    statusContext.setData([]);
  }, []);

  React.useEffect(() => {
    NotificationError(statusContext.error);
  }, [statusContext.error]);

  React.useEffect(() => {
    let time = setInterval(() => {
      let ping = 0;

      ping = ping+1

      if(ping === 1800){
        statusContext.getStatus();
        return ping =0;
      }

    })
    return () => {
      clearInterval(time)
    };
  })

  return (
    <div className={styles.container}>
       <h3 className="titleSection">Lista de Aparelhos</h3>
      {statusContext.loading && <Loading loading={statusContext.loading} />}
      <div className={styles.tableArea}>
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              <th>ID aparelho</th>
              <th>Loja</th>
              <th>Departamento</th>
              <th>Ip</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {statusContext.data != undefined && statusContext.data.map((status) => (
              <tr key={status.id}>
                <td>{status.app_id}</td>
                {/* <td>{status.shop}</td> */}
                {/* <td>{status.department}</td> */}
                <td>{screen.dataShop != undefined && screen.dataShop.length > 1 && screen.dataShop.map((shop) => (
                  status.shop == shop.id ?
                    shop.description : ''
                ))}</td>
                <td>{screen.dataDepartment != undefined && screen.dataDepartment.length > 1 && screen.dataDepartment.map((department) => (
                  status.department == department.id ?
                    department.description : ''
                ))}</td>
                <td>{status.ip}</td>

                <td>{status.status == 1 ?
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span className={styles.circleOff} />
                    <span >OFFLINE</span>
                  </div> :
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span className={styles.circleOn} />
                    <span >ONLINE</span>
                  </div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;

