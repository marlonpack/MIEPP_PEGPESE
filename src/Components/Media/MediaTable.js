import React from "react";
import { ViewList, Create, Delete, Attachment } from "@material-ui/icons";
import Button from "../Forms/Button";
import styles from "./MediaTable.module.css";

const MediaTable = ({
  mediaContext,
  providerContext,
  showMenu,
  setShowMenu,
  setEditMedia,
  setDelMedia,
  setShowYesNoModal,
  filterData,
  setFilterData,
  data,
}) => {
  function getFile(id, type) {
    if (showMenu) {
      mediaContext.loadMediaFile(id, type);
    }
  }

  function orderMedia(order) {
    const filter = [...mediaContext.data];
    switch (order) {
      case "id":
        filter.sort();
        break;
      case "description":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "provider":
        filter.sort(function (a, b) {
          if (a.supplier_id > b.supplier_id) {
            return 1;
          } else {
            return -1;
          }
        });
        break;
      case "type":
        filter.sort(function (a, b) {
          if (a.type > b.type) {
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
  return (
    <div className={styles.tableArea} style={showMenu ? { width: "60%" } : {}}>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Fornecedor</th>
            <th>Tipo</th>
            <th>Versão</th>
            <th>Arquivo</th>
            <th>Opções</th>
          </tr>

          <tr>
            <th>
              <span onClick={() => orderMedia("id")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => orderMedia("description")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => orderMedia("provider")}>
                <ViewList className={styles.tableStyleOrder} />
              </span>
            </th>
            <th>
              <span onClick={() => orderMedia("type")}>
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
            ? filterData.map((media) => (
                <tr key={media.id}>
                  <td>{media.id}</td>
                  <td>{media.description}</td>
                  {providerContext.provider.map(
                    (provider) =>
                      provider.id === media.supplier_id && (
                        <td key={provider.id}>{provider.description}</td>
                      )
                  )}

                  <td>{media.type}</td>
                  <td>{media.file_version}</td>
                  <td>
                    <Button
                      style="btnAttachment"
                      title="Visualizar"
                      type="button"
                      onClick={() => getFile(media.id, media.type)}
                    >
                      <Attachment />
                    </Button>
                  </td>
                  <td>
                    <div className={styles.tableStyleButtons}>
                      <Button
                        title="Editar"
                        type="button"
                        style="btnEdit"
                        onClick={() => (setEditMedia(media), setShowMenu(true))}
                      >
                        <Create />
                      </Button>
                      <Button
                        title="Excluir"
                        type="button"
                        style="btnDelete"
                        onClick={() => (
                          setDelMedia(media.id), setShowYesNoModal(true)
                        )}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            : data.map((media) => (
                <tr key={media.id}>
                  <td>{media.id}</td>
                  <td>{media.description}</td>
                  {providerContext.provider.map(
                    (provider) =>
                      provider.id === media.supplier_id && (
                        <td key={provider.id}>{provider.description}</td>
                      )
                  )}

                  <td>{media.type}</td>
                  <td>{media.file_version}</td>
                  <td>
                    <Button
                      style="btnAttachment"
                      title="Visualizar"
                      type="button"
                      onClick={() => getFile(media.id, media.type)}
                    >
                      <Attachment />
                    </Button>
                  </td>
                  <td>
                    <div className={styles.tableStyleButtons}>
                      <Button
                        title="Editar"
                        type="button"
                        style="btnEdit"
                        onClick={() => (setEditMedia(media), setShowMenu(true))}
                      >
                        <Create />
                      </Button>
                      <Button
                        title="Excluir"
                        type="button"
                        style="btnDelete"
                        onClick={() => (
                          setDelMedia(media.id), setShowYesNoModal(true)
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

export default MediaTable;
