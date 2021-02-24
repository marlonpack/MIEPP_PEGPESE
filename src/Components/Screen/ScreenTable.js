import React from 'react';
import styles from "./ScreenTable.module.css";
import Button from "../Forms/Button";
import { ScreenContext } from "../../Contexts/ScreenContext";
import YesNoModal from "../YesNoModal/YesNoModal";
import {
  ViewList,
  Create,
  Delete,
} from "@material-ui/icons";



function ScreenTable({ typeSearch, filterScreen }) {

  const { data, loadScreen, editScreen, deleteScreen } = React.useContext(ScreenContext);
  const [filterData, setFilterData] = React.useState([]);
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
  const [ActionDelete, setActionDelete] = React.useState('');
  // const [openEdit, setOpenEdit] = React.useState(false);


  React.useEffect(() => {
    loadScreen();
  }, []);

  console.log(data)
  React.useEffect(() => {
    let filter = []
    console.log(typeSearch)
    switch (typeSearch) {
      case 'id':
        filter = data.filter((data) =>
          String(data.id).toLowerCase().includes(filterScreen)
        );
        break;
      case 'description':
        filter = data.filter((data) =>
          data.description.toLowerCase().includes(filterScreen)
        );
        break;
      case 'time':
        filter = data.filter((data) =>
          data.time.toLowerCase().includes(filterScreen)
        );
        break;
      case 'media':
        filter = data.filter((data) =>
          String(data.media_id).toLowerCase().includes(filterScreen)
        );
        break;
      case 'Department':
        filter = data.filter((data) =>
          String(data.department_id).toLowerCase().includes(filterScreen)
        );
        break;
    }
    setFilterData([...filter])
  }, [filterScreen]);


  function handleClick(data) {
    editScreen(data, true)
  }

  function screenDelete(id) {
    setShowYesNoModal(true)
    setActionDelete(id)
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
          return a.time.localeCompare(b.time);
        });
        break;
      case "media":
        filter.sort(function (a, b) {
          if (a.media_id > b.media_id)
            return 1;
          if (a.media_id < b.media_id)
            return -1;
          return 0;
        });
        break;
      case "department":
        filter.sort(function (a, b) {
          if (a.department_id > b.department_id)
            return 1;
          if (a.department_id < b.department_id)
            return -1;
          return 0;
        });
        break;
      default:
        return;
    }

    setFilterData(filter)
  }

  return (
    <table className={styles.tableStyle}>
      {showYesNoModal && (
        <YesNoModal
          question="Tem certeza que deseja excluir?"
          action={() => deleteScreen(ActionDelete)}
          close={() => {
            setShowYesNoModal(false);
          }}
        />
      )}
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
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("id")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("description")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("time")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("media")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("department")} />
            </span>
          </th>
          <th></th>

        </tr>
      </thead>

      <tbody>
        {filterData.length > 0 ? filterData.map((data, index) => (
          <tr key={index}>
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
        )) :
          (data.map((data, index) => (
            <tr key={index}>
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