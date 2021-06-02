import React from 'react';
import styles from './ShopTimeline.module.css';
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import {
  AddBox,
  Search,
} from "@material-ui/icons";
import ShopTimelineRegister from './ShopTimelineRegister';
import ShopTimelineTable from './ShopTimelineTable';
import { ShopTimelineContext } from '../../Contexts/ShopTimelinecontext';
import { TimelineContext } from '../../Contexts/TimelineContext';
import { ScreenContext } from '../../Contexts/ScreenContext';
import NotificationError from '../Notification/NotificationError';



function ShopTimeLine() {

  const [showMenu, setShowMenu] = React.useState(false);
  const [filterScreen, setfilterScreen] = React.useState(false);
  const [typeSearch, setTypeSearch] = React.useState("");
  const ShopTimeline = React.useContext(ShopTimelineContext);
  const timeline = React.useContext(TimelineContext);
  const screen = React.useContext(ScreenContext);

  React.useEffect(() => {
    timeline.loadTimelines();
    screen.getShopDepartment();
  }, [])

  React.useEffect(()=>{
    NotificationError(ShopTimeline.error)
  },[ShopTimeline.error])

  // React.useEffect(() => {
  //   console.log(screen.dataShop)
  // }, [screen.dataShop])

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
              // editScreen([], false)
            }}
          >
            <AddBox />
          </Button>

          <h3 className="titleSection">Lojas do Timeline</h3>
        </div>
        <div className={styles.topMediaRight}>
          <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="id">Id timeline</option>
            <option value="shop_id">Id loja</option>
          </select>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar"
            type="text"
            id="searchScreen"
            name="searchScreen"
            onChange={({ target }) => { searchScreen(target.value) }}
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>

      <div className={styles.mainMedia}>
        {showMenu && (
          <ShopTimelineRegister />

        )}
        <div
          className={styles.tableArea}
          style={showMenu ? { width: "60%" } : {}}
        >
          <ShopTimelineTable typeSearch={typeSearch} filterScreen={filterScreen} />
          {/* <ScreenTable typeSearch={typeSearch} filterScreen={filterScreen} /> */}
        </div>
      </div>
    </div>
  );
}



export default ShopTimeLine;
