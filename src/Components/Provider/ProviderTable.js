import React from "react";
import styles from "./ProviderTable.module.css";
import { Create, Delete, ViewList } from "@material-ui/icons";
import Button from "../Forms/Button";

const ProviderTable = ({
  showMenu,
  orderProviders,
  filterData,
  setEditProvider,
  setShowYesNoModal,
  setDelProvider,
  data,
}) => {
  return (
    <div className={styles.tableArea} style={showMenu ? { width: "60%" } : {}}>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Opções</th>
          </tr>
          <tr>
            <th>
              <span>
                <ViewList
                  className={styles.tableStyleOrder}
                  onClick={() => orderProviders("id")}
                />
              </span>
            </th>
            <th>
              <span>
                <ViewList
                  className={styles.tableStyleOrder}
                  onClick={() => orderProviders("name")}
                />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filterData.length > 0
            ? filterData.map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.id}</td>
                  <td>{provider.description}</td>
                  <td className={styles.tableStyleButtons}>
                    <Button
                      title="Editar"
                      type="button"
                      style="btnEdit"
                      onClick={() => setEditProvider(provider)}
                    >
                      <Create />
                    </Button>
                    <Button
                      title="Excluir"
                      type="button"
                      style="btnDelete"
                      onClick={() => (
                        setShowYesNoModal(true), setDelProvider(provider.id)
                      )}
                    >
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))
            : data && data.map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.id}</td>
                  <td>{provider.description}</td>
                  <td className={styles.tableStyleButtons}>
                    <Button
                      title="Editar"
                      type="button"
                      style="btnEdit"
                      onClick={() => setEditProvider(provider)}
                    >
                      <Create />
                    </Button>
                    <Button
                      title="Excluir"
                      type="button"
                      style="btnDelete"
                      onClick={() => (
                        setShowYesNoModal(true), setDelProvider(provider.id)
                      )}
                    >
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderTable;
