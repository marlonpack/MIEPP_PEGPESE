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
}) => {
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
              <span onClick={() => {}}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => {}}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => {}}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => {}}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((timeline) => (
              <tr key={timeline.id}>
                <td>{timeline.id}</td>
                <td>{timeline.description}</td>
                <td>{timeline.initial_date}</td>
                <td>{timeline.final_date}</td>
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
