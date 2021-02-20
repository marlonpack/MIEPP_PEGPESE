import React from 'react';
import styles from "./ScreenTable.module.css";
import Button from "../Forms/Button";
import { ScreenContext } from "../../Contexts/ScreenContext";
import {
  ViewList,
  Create,
  Delete,
} from "@material-ui/icons";



function ScreenTable() {

  const { data, loadScreen, editScreen } = React.useContext(ScreenContext);
  
  // const [dataEdit, setDataEdit] = React.useState([]);
  // const [openEdit, setOpenEdit] = React.useState(false);


  React.useEffect(() => {
    loadScreen();
  }, []);

  function handleClick(data){
    editScreen(data, true)
  } 



  return (
    <table className={styles.tableStyle}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Tempo</th>
          <th>Mídia</th>
          <th>Departamento</th>
          <th>Opções</th>
        </tr>
        <tr>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} />
            </span>
          </th>
          <th></th>

        </tr>
      </thead>

      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.description}</td>
            <td>{data.time}</td>
            <td>{data.media_id}</td>
            <td>{data.department_id}</td>
            <td>
              <div className={styles.tableStyleButtons}>
                <Button
                  title="Editar"
                  type="button"
                  style="btnEdit"
                  onClick={() => {
                    handleClick(data)
                  }}>
                  <Create />
                </Button>
                <Button title="Excluir" type="button" style="btnDelete">
                  <Delete />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export default ScreenTable;