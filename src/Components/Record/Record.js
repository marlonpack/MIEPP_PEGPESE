import React from "react";
import styles from "./Record.module.css";
import { MediaContext } from "../../Contexts/MediaContext";
import { RecordContext } from "../../Contexts/RecordContext";
import { ViewList } from "@material-ui/icons";
import { ScreenContext } from "../../Contexts/ScreenContext";
import Loading from "../Loading/Loading";
import NotificationError from "../Notification/NotificationError";
import { AddBox, Search } from "@material-ui/icons";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

const Record = () => {
  const mediaContext = React.useContext(MediaContext);
  const recordContext = React.useContext(RecordContext);
  const [media, setMedia] = React.useState([]);
  const [selectMedia, setSelectMedia] = React.useState(0);
  const [filterData, setFilterData] = React.useState();
  const [typeSearch, setTypeSearch] = React.useState();
  const screen = React.useContext(ScreenContext);

  React.useEffect(() => {
    mediaContext.loadMedia();
    screen.getShopDepartment();
    recordContext.setData(undefined);
  }, []);

  React.useEffect(() => {
    setMedia(mediaContext.data)
  }, [mediaContext.data]);

  // React.useEffect(() => {
  //   console.log(recordContext.data)
  // }, [recordContext.data]);
  // console.log(screen.dataDepartment);
  function handleClick() {
    setFilterData(undefined)
    recordContext.getRecord(selectMedia);
  }

  function searchScreen(typeSearc) {
    let filter = [];

    switch (typeSearch) {
      case "date":
        filter = recordContext.data.filter((data) =>
          String(data.date).toLowerCase().includes(typeSearc)
        );
        break;
      case "shop":
        const shop = screen.dataShop.filter((provider) =>
          provider.description.toLowerCase().includes(typeSearc)
        );

        if (shop.length > 0) {
          filter = recordContext.data.filter(
            (media) => media.shop_id === shop[0].id
          );
        }

        break;
        case "timeInitial":
          filter = recordContext.data.filter((data) =>
       String(data.initial_time).toLowerCase().includes(typeSearc)
          );
          break;
      case "timeFinal":
        filter = recordContext.data.filter((data) =>
          String(data.final_time).toLowerCase().includes(typeSearc)
        );
        break;
      case "Department":
        const department = screen.dataDepartment.filter((provider) =>
          provider.description.toLowerCase().includes(typeSearc)
        );

        if (department.length > 0) {
          filter = recordContext.data.filter(
            (media) => media.department_id === department[0].id
          );
        }
        break;
    }
    console.log(filter);
    setFilterData([...filter]);
  }

  function orderProviders(order) {
    let filter = [];
    let filterData = recordContext.data != undefined ? [...recordContext.data] : [];
    let filterShop = [...screen.dataShop];
    let filterDepartment = [...screen.dataDepartment];
    let filterMedia = [...mediaContext.data];


    switch (order) {

      case "date":
        filterData.sort(function (a, b) {
          return a.date.localeCompare(b.date);
        });
        filter.push(...filterData);
        break;


      case "mediaId":
        filterMedia.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        for (let i = 0; filterMedia.length > i; i++) {
          for (let o = 0; filterData.length > o; o++) {
            if (filterData[o].media_id == filterMedia[i].id) {
              filter.push(filterData[o]);
            }
          }
        }
        break;
      case "initial":
        filterData.sort(function (a, b) {
          return a.initial_time.localeCompare(b.initial_time);
        });
        filter.push(...filterData);
        break;

      case "final":
        filterData.sort(function (a, b) {
          return a.final_time.localeCompare(b.final_time);
        });
        filter.push(...filterData);
        break;

      case "shop":
        filterShop.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });

        for (let i = 0; filterShop.length > i; i++) {
          for (let o = 0; filterData.length > o; o++) {
            if (filterData[o].shop_id == filterShop[i].id) {
              filter.push(filterData[o]);
            }
          }
        }
        break;
      case "department":
        filterDepartment.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });

        for (let i = 0; filterDepartment.length > i; i++) {
          for (let o = 0; filterData.length > o; o++) {
            if (filterData[o].department_id == filterDepartment[i].id) {
              filter.push(filterData[o]);
            }
          }
        }
        break;
      default:
        return;
    }
    setFilterData(filter);
  }

  return (
    <div className={styles.container}>
       <h3 className="titleSection">RELATÓRIO:</h3>
      <div className={styles.divHeader}>
        <div className={styles.topMediaLeft}>
          <p className={styles.p}>Mídia:</p>
          <select
            onChange={({ target }) => setSelectMedia(target.value)}
            value={selectMedia}
            className={styles.select}
          >
            <option value={0}>
              select
          </option>
            {media.map((data, index) => (
              <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
            ))}
          </select>
          <button onClick={() => handleClick()} className={styles.button}>Visualizar</button>
        </div>


        <div className={styles.topMediaRight}>
          <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="date">Data</option>
            <option value="timeInitial">Hora inicial</option>
            <option value="timeFinal">Hora final</option>
            <option value="shop">Loja</option>
            <option value="Department">Departamento</option>
          </select>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar"
            type="text"
            id="searchScreen"
            name="searchScreen"
            onChange={({ target }) => {
              searchScreen(target.value);
            }}
          />
          <button type="button" className={styles.btnSearch}>
            <Search />
          </button>
        </div>

      </div>
      <div className={styles.tableArea}>
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              <th>Media</th>
              <th>Data</th>
              <th>Hora inicial</th>
              <th>Hora final</th>
              <th>Loja</th>
              <th>Deparmento</th>
            </tr>

            <tr>
              <th>
                <span onClick={() => orderProviders("mediaId")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => orderProviders("date")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => orderProviders("initial")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => orderProviders("final")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => orderProviders("shop")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => orderProviders("department")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {filterData != undefined ? filterData.map((media) => (
              <tr key={media.id}>
                <td>{mediaContext.data != undefined && mediaContext.data.length > 1 && mediaContext.data.map((id, index) =>
                  media.media_id == id.id ? id.description : ''
                )}</td>
                <td>{media.date}</td>
                <td>{media.initial_time}</td>
                <td>{media.final_time}</td>
                <td>{screen.dataShop != undefined && screen.dataShop.length > 1 && screen.dataShop.map((shop) => (
                  media.shop_id == shop.id ?
                    shop.description : ''
                ))}</td>
                <td>{screen.dataDepartment != undefined && screen.dataDepartment.length > 1 && screen.dataDepartment.map((department) => (
                  media.department_id == department.id ?
                    department.description : ''
                ))}</td>
              </tr>)) :
              recordContext.data != undefined && recordContext.data.map((media) => (
                <tr key={media.id}>
                  {/* <td>{media.media_id}</td> */}
                  <td>{mediaContext.data != undefined && mediaContext.data.length > 1 && mediaContext.data.map((id, index) =>
                    media.media_id == id.id ? id.description : ''
                  )}</td>
                  <td>{media.date}</td>
                  <td>{media.initial_time}</td>
                  <td>{media.final_time}</td>
                  {/* <td>{media.shop_id}</td> */}
                  <td>{screen.dataShop != undefined && screen.dataShop.length > 1 && screen.dataShop.map((shop) => (
                    media.shop_id == shop.id ?
                      shop.description : ''
                  ))}</td>
                  {/* <td>{media.department_id}</td> */}
                  {/* <td>{dataDepartment}</td> */}
                  <td>{screen.dataDepartment != undefined && screen.dataDepartment.length > 1 && screen.dataDepartment.map((department) => (
                    media.department_id == department.id ?
                      department.description : ''
                  ))}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Record;

