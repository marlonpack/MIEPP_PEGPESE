import React from "react";
import styles from "./CreateTimelineTable.module.css";
import { Create, Delete, ViewList } from "@material-ui/icons";
import Button from "../Forms/Button";

const CreateTimelineTable = ({
  showMenu,
  data,
  setShowYesNoModal,
  setDelTimeline,
  setEditTimeline,
  setShowMenu,
  filterData,
  setFilterData,
}) => {

  function orderTimeline(order) {
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
      case "initialDate":
        filter.sort(function (a, b) {
          if (a.final_date > b.initial_date) {
            return 1;
          } else {
            return -1;
          }
        });
        break;
      case "finalDate":
        filter.sort(function (a, b) {
          if (a.initial_date > b.final_date) {
            return 1;
          } else {
            return -1;
          }
        });
        break;
      default:
        return;
    }

    setFilterData(filter);
  }

  function formatDate (data){
    let newData= data !=  null  && data.split('-') 

   if(newData) return `${newData[2]}/${newData[1]}/${newData[0]}`
  }

  return (
    <div className={styles.tableArea} style={showMenu ? { width: "60%" } : {}}>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Data inicial</th>
            <th>Data final</th>
            <th>Horário inicial</th>
            <th>Horário final</th>
            <th>Opções</th>
          </tr>

          <tr>
            <th>
              <span onClick={() => orderTimeline("id")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => orderTimeline("description")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => orderTimeline("initialDate")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => orderTimeline("finalDate")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filterData.length > 0
            ? filterData.map((timeline) => (
                <tr key={timeline.id}>
                  <td>{timeline.id}</td>
                  <td>{timeline.description}</td>
                  <td>{formatDate(timeline.initial_date)}</td>
                  <td>{formatDate(timeline.final_date)}</td>
                  <td>{timeline.initial_hour}</td>
                  <td>{timeline.final_hour}</td>
                  <td>
                    <div className={styles.tableStyleButtons}>
                      <Button
                        title="Editar"
                        type="button"
                        style="btnEdit"
                        onClick={() => (
                          setShowMenu(true), setEditTimeline(timeline)
                        )}
                      >
                        <Create />
                      </Button>
                      <Button
                        title="Excluir"
                        type="button"
                        style="btnDelete"
                        onClick={() => (
                          setDelTimeline(timeline.id), setShowYesNoModal(true)
                        )}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            : data &&
              data.map((timeline) => (
                <tr key={timeline.id}>
                  <td>{timeline.id}</td>
                  <td>{timeline.description}</td>
                  <td>{formatDate(timeline.initial_date)}</td>
                  <td>{formatDate(timeline.final_date)}</td>
                  <td>{timeline.initial_hour}</td>
                  <td>{timeline.final_hour}</td>
                  <td>
                    <div className={styles.tableStyleButtons}>
                      <Button
                        title="Editar"
                        type="button"
                        style="btnEdit"
                        onClick={() => (
                          setShowMenu(true), setEditTimeline(timeline)
                        )}
                      >
                        <Create />
                      </Button>
                      <Button
                        title="Excluir"
                        type="button"
                        style="btnDelete"
                        onClick={() => (
                          setDelTimeline(timeline.id), setShowYesNoModal(true)
                        )}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateTimelineTable;
