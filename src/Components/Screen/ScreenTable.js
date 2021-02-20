import React from 'react';
import styles from "./ScreenTable.module.css";
import Button from "../Forms/Button";
import { ScreenContext } from "../../Contexts/ScreenContext";
import {
  ViewList,
  Create,
  Delete,
} from "@material-ui/icons";



function ScreenTable(props) {

  const { data, loadScreen, editScreen, deleteScreen } = React.useContext(ScreenContext);
  const [filterData, setFilterData] = React.useState([]);
  // const [dataEdit, setDataEdit] = React.useState([]);
  // const [openEdit, setOpenEdit] = React.useState(false);


  React.useEffect(() => {
    loadScreen();
  }, []);

  React.useEffect(() => {
    const filter = data.filter((data) =>
      data.description.toLowerCase().includes(props.filterScreen)
    );
    setFilterData([...filter])
  }, [props]);


  function handleClick(data) {
    editScreen(data, true)
  }

  function screenDelete(id) {
    // deleteScreen(id)
  }

 

  function orderProviders(order) {
    const filter = [...data];
    switch (order) {
      case "id":
        filter.sort();
        break;
      case "description":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
        case "time":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
        case "media":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
        case "department":
          filter.sort(function (a, b) {
            return a.description.localeCompare(b.description);
          });
          break;
      default:
        return;
    }

    setFilterData(filter)
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
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("id")}/>
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("description")}/>
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("time")}/>
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("media")}/>
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("department")}/>
            </span>
          </th>
          <th></th>

        </tr>
      </thead>

      <tbody>
        {filterData.length > 0 ?filterData.map((data) => (
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
                <Button title="Excluir" type="button" style="btnDelete" onClick={() => { screenDelete(data.id) }}>
                  <Delete />
                </Button>
              </div>
            </td>
          </tr>
        )):
        (data.map((data) => (
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
                <Button title="Excluir" type="button" style="btnDelete" onClick={() => { screenDelete(data.id) }}>
                  <Delete />
                </Button>
              </div>
            </td>
          </tr>
        )))}
      </tbody>
    </table>
  )
}


export default ScreenTable;