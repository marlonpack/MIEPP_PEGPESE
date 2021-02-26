import React from "react";
import styles from "./Screen.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import {
  AddBox,
  Search,
} from "@material-ui/icons";
import ScreenRegisterEdit from "./ScreenRegisterEdit";
import ScreenTable from "./ScreenTable";
import { ScreenContext } from "../../Contexts/ScreenContext";
import { ProductContext } from "../../Contexts/ProductContext";
import NotificationError from '../Notification/NotificationError'

const Screen = () => {
  const {error, openEditScreen, editScreen } = React.useContext(ScreenContext);
  const {OpenModalProduct} = React.useContext(ProductContext);
  const [showMenu, setShowMenu] = React.useState(false);
  const [filterScreen, setfilterScreen] = React.useState(false);
  const [typeSearch, setTypeSearch] = React.useState("");

  React.useEffect(() => {
    if(openEditScreen=== true){
      setShowMenu(true)
    }
  });

  React.useEffect(()=>{
    NotificationError(error)
  },[error])


  function searchScreen(name) {
    if (typeSearch === "") {
      setfilterScreen([]);
      return;
    }
    const proName = name.toLowerCase();
    setfilterScreen(proName);
  }

  return (
    <div className={styles.containerMedia}>
      <div className={styles.topMedia}>
        <div className={styles.topMediaLeft}>
          <Button
            type="button"
            style="btnAdd"
            onClick={() => {
              setShowMenu(!showMenu)
              editScreen([], false)
            }}
          >
            <AddBox />
          </Button>

          <h3 className="titleSection">Lista de Telas</h3>
        </div>
        <div className={styles.topMediaRight}>
        <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="id">ID</option>
            <option value="description">Descrição</option>
            <option value="time">Tempo</option>
            <option value="media">mídia</option>
            <option value="Department">Departamento</option>
          </select>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar"
            type="text"
            id="searchScreen"
            name="searchScreen"
            onChange={({target})=>{searchScreen(target.value)}}
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>

      <div className={styles.mainMedia}>
        {showMenu && (
          <ScreenRegisterEdit />
        )}
        <div
          className={styles.tableArea}
          style={showMenu  ? { width: "60%" } : {}}
        >
          <ScreenTable typeSearch={typeSearch} filterScreen={filterScreen}/>
        </div>
      </div>
    </div>
  );
}

export default Screen;
