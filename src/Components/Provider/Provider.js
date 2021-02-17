import React from "react";
import styles from "./Provider.module.css";
import { ReactComponent as ImgProvider } from "../../Assets/provider.svg";
import { AddBox, Create, Delete, ViewList, Search } from "@material-ui/icons";
import { ProviderContext } from "../../ProviderContext";

const Provider = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const {
    createProvider,
    updateProvider,
    loadProviders,
    deleteProvider,
    data,
    error,
  } = React.useContext(ProviderContext);
  const [provider, setProvider] = React.useState("");
  const [editProvider, setEditProvider] = React.useState(null);

  React.useEffect(() => {
    loadProviders();
  }, []);

  React.useEffect(() => {
    if (editProvider !== null) {
      setShowMenu(true);
      setProvider(editProvider.description);
    }
  }, [editProvider]);

  function handleSubmit(e) {
    e.preventDefault();

    if (provider === "") {
      return;
    }

    if (editProvider === null) {
      createProvider(provider);
    } else {
      updateProvider(provider, editProvider.id);
    }

    setEditProvider(null);
    setProvider("");
  }

  return (
    <div className={styles.containerProvider}>
      <div className={styles.topProvider}>
        <div className={styles.topProviderLeft}>
          <button
            type="button"
            className="btnAdd"
            onClick={() => (
              setShowMenu(!showMenu), setProvider(""), setEditProvider(null)
            )}
          >
            <AddBox />
          </button>

          <h3 className="titleSection">Lista de fornecedores</h3>
        </div>
        {error && <h1 color="#fff">{error}</h1>}
        <div className={styles.topProviderRight}>
          <label htmlFor="searchProvider">Pesquisar</label>
          <input type="text" id="searchProvider" name="searchProvider" />
          <button type="button" className="btnSearch">
            <Search />
          </button>
        </div>
      </div>
      <div className={styles.mainProvider}>
        {showMenu && (
          <div className={[styles.providerMenu, "animeLeft"].join(" ")}>
            <h4 className="titleActionPage">Cadastrar / Editar Fornecedor</h4>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="providerName">Nome: </label>
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  value={provider}
                  onChange={({ target }) => setProvider(target.value)}
                />
              </div>

              <button type="submit">Salvar</button>
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
            <tr>
              <th>
                <span>
                  <ViewList />
                </span>
              </th>
              <th>
                <span>
                  <ViewList />
                </span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.id}</td>
                  <td>{provider.description}</td>
                  <td className={styles.tableStyleButtons}>
                    <button
                      type="button"
                      className="btnEdit"
                      onClick={() => setEditProvider(provider)}
                    >
                      <Create />
                    </button>
                    <button
                      type="button"
                      className="btnDelete"
                      onClick={() => deleteProvider(provider.id)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Provider;
