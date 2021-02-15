import React from "react";
import styles from "./Provider.module.css";
import { ReactComponent as ImgProvider } from "../../Assets/provider.svg";
import { AddBox, Create, Delete } from "@material-ui/icons";

const Provider = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className={styles.containerProvider}>
      <div className={styles.topProvider}>
        <button
          type="button"
          className="btnAdd"
          onClick={() => setShowMenu(!showMenu)}
        >
          <AddBox />
        </button>

        <h3 className="titleSection">Lista de fornecedores</h3>
      </div>
      <div className={styles.mainProvider}>
        {showMenu && (
          <div className={[styles.providerMenu,"animeLeft"].join(" ")}>
            <h4 className="titleActionPage">Cadastrar / Editar Fornecedor</h4>
            <form>
              <div>
                <label htmlFor="providerName">Nome: </label>
                <input type="text" id="providerName" name="providerName" />
              </div>

              <button type="button">Salvar</button>
            </form>

            <ImgProvider className={styles.providerImg} />
          </div>
        )}
        <table
          className={styles.tableStyle}
          style={showMenu ? { width: "60%" } : {}}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PegPese</td>
              <td className={styles.tableStyleButtons}>
                <button type="button" className="btnEdit">
                  <Create />
                </button>
                <button type="button" className="btnDelete">
                  <Delete />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Provider;
