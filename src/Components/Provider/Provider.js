import React from "react";
import styles from "./Provider.module.css";
import { ReactComponent as ImgProvider } from "../../Assets/provider.svg";
import { AddBox, Create, Delete, ViewList, Search } from "@material-ui/icons";
import { ProviderContext } from "../../Contexts/ProviderContext";
import YesNoModal from "../YesNoModal/YesNoModal";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

const Provider = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
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
  const [delProvider, setDelProvider] = React.useState(null);
  const [filterData, setFilterData] = React.useState([]);

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

  function searchProvider(name) {
    if (name === "") {
      setFilterData([]);
      return;
    }
    const proName = name.toLowerCase();
    const filter = data.filter((provider) =>
      provider.description.toLowerCase().includes(proName)
    );

    setFilterData([...filter]);
  }

  function orderProviders(order) {
    const filter = [...data];

    switch (order) {
      case "id":
        filter.sort();
        break;
      case "name":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      default:
        return;
    }

    setFilterData(filter);
  }

  return (
    <div className={styles.containerProvider}>
      {showYesNoModal && (
        <YesNoModal
          question="Tem certeza que deseja excluir?"
          action={() => deleteProvider(delProvider)}
          close={() => {
            setShowYesNoModal(false);
            setDelProvider(null);
          }}
        />
      )}

      <div className={styles.topProvider}>
        <div className={styles.topProviderLeft}>
          <Button
            type="button"
            style="btnAdd"
            onClick={() => (
              setShowMenu(!showMenu), setProvider(""), setEditProvider(null)
            )}
          >
            <AddBox />
          </Button>

          <h3 className="titleSection">Lista de fornecedores</h3>
        </div>
        <div className={styles.topProviderRight}>
          <Input
            style={styles.topProviderForm}
            label="Pesquisar"
            type="text"
            id="searchProvider"
            name="searchProvider"
            onChange={({ target }) => searchProvider(target.value)}
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>
      <div className={styles.mainProvider}>
        {showMenu && (
          <div className={[styles.providerMenu, "animeLeft"].join(" ")}>
            <h4 className="titleActionPage">Cadastrar / Editar Fornecedor</h4>
            <form action="" onSubmit={handleSubmit}>
              <Input
                style={styles.providerMenuForm}
                label="Nome: "
                type="text"
                id="providerName"
                name="providerName"
                value={provider}
                onChange={({ target }) => setProvider(target.value)}
              />

              <Button type="submit">Salvar</Button>
            </form>

            <ImgProvider
              alt="Imagem ilustrativa"
              title=""
              className={styles.providerImg}
            />
          </div>
        )}

        <div
          className={styles.tableArea}
          style={showMenu ? { width: "60%" } : {}}
        >
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
                : data.map((provider) => (
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
      </div>
    </div>
  );
};

export default Provider;
