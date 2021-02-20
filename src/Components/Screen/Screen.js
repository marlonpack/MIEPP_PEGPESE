import React from "react";
import styles from "./Screen.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { convertBase64 } from "../../utils/base64";
import {
  AddBox,
  Search,
} from "@material-ui/icons";
import ScreenRegisterEdit from "./ScreenRegisterEdit";
import ScreenTable from "./ScreenTable";
import { ScreenContext } from "../../Contexts/ScreenContext";

const Screen = () => {
  const { openEditScreen, editScreen } = React.useContext(ScreenContext);
  const [showMenu, setShowMenu] = React.useState(false);
  const [filterScreen, setfilterScreen] = React.useState(false);

  React.useEffect(() => {
    if(openEditScreen){
      setShowMenu(true)
    }
  });


  function searchScreen(name) {
    if (name === "") {
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
              editScreen('', false)
            }}
          >
            <AddBox />
          </Button>

          <h3 className="titleSection">Lista de Telas</h3>
        </div>
        <div className={styles.topMediaRight}>
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
          <ScreenTable filterScreen={filterScreen}/>
        </div>
      </div>
    </div>
  );
}

export default Screen;
