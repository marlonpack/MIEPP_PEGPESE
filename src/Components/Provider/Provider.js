import React from "react";
import styles from "./Provider.module.css";
import { AddBox, Search } from "@material-ui/icons";
import { ProviderContext } from "../../Contexts/ProviderContext";
import YesNoModal from "../YesNoModal/YesNoModal";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import ProviderTable from "./ProviderTable";
import ProviderMenu from "./ProviderMenu";
import Loading from "../Loading/Loading";

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
    loading,
  } = React.useContext(ProviderContext);
  const [provider, setProvider] = React.useState("");
  const [editProvider, setEditProvider] = React.useState(null);
  const [delProvider, setDelProvider] = React.useState(null);
  const [filterData, setFilterData] = React.useState([]);
  const [typeSearch, setTypeSearch] = React.useState("");

  React.useEffect(() => {
    loadProviders();
  }, []);

  React.useEffect(() => {
    if (editProvider !== null) {
      setShowMenu(true);
      setProvider(editProvider.description);
    }
  }, [editProvider]);

  React.useEffect(() => {
    if (typeSearch === "") {
      setFilterData([]);
      document.getElementById("searchProvider").value = "";
    }
  }, [typeSearch]);

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

  function searchProvider(search) {
    if (typeSearch === "") {
      setFilterData([]);
      return;
    }

    let filter = [];

    switch (typeSearch) {
      case "name":
        const proName = search.toLowerCase();
        filter = data.filter((provider) =>
          provider.description.toLowerCase().includes(proName)
        );
        break;

      case "id":
        filter = data.filter((provider) =>
          String(provider.id).includes(search)
        );
        break;
    }

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
      {loading && <Loading loading={loading} />}
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
          <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="name">Nome</option>
            <option value="id">ID</option>
          </select>

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
          <ProviderMenu
            handleSubmit={handleSubmit}
            provider={provider}
            setProvider={setProvider}
          />
        )}

        <ProviderTable
          showMenu={showMenu}
          orderProviders={orderProviders}
          filterData={filterData}
          setEditProvider={setEditProvider}
          setShowYesNoModal={setShowYesNoModal}
          setDelProvider={setDelProvider}
          data={data}
        />
      </div>
    </div>
  );
};

export default Provider;
