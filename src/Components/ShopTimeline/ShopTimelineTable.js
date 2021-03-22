import React from 'react';
import Button from "../Forms/Button";
import { ScreenContext } from "../../Contexts/ScreenContext";
import YesNoModal from "../YesNoModal/YesNoModal";
import { ViewList, Create, Delete, ShoppingCart } from "@material-ui/icons";
import styles from './ShopTimelineTable.module.css';
import { ShopTimelineContext } from '../../Contexts/ShopTimelinecontext';
import { TimelineContext } from '../../Contexts/TimelineContext';



function ShopTimelineTable({ typeSearch, filterScreen }) {


  const [filterData, setFilterData] = React.useState([]);
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
  const [timelineIdDelete, setTimelineIdDelete] = React.useState('');
  const [shopId, setShopId] = React.useState('');
  const [getShopTimeline, setGetShopTimeline] = React.useState([]);
  const ShopTimeline = React.useContext(ShopTimelineContext);
  const screen = React.useContext(ScreenContext);
  const timeline = React.useContext(TimelineContext);

  

  React.useEffect(() => {
    let test = []
    ShopTimeline.data.forEach((timeline) => {
      if (ShopTimeline.data.length > 0)
        test.push(...timeline)
    })
    setGetShopTimeline(test);
  }, [ShopTimeline.data]);




  React.useEffect(() => {
    let filter = [];
    let filterTime = [timeline.data];
    let filterShop = [...screen.dataShop];
    switch (typeSearch) {
      case "id":
        filterTime = timeline.data.filter((data) =>
          String(data.description).toLowerCase().includes(filterScreen)
        );
        for (let i = 0;  filterTime.length > i; i++) {
          for (let o = 0; getShopTimeline.length > o; o++) {
            if (getShopTimeline[o].timeline_id == filterTime[i].id) {
              // console.log(getShopTimeline[o], filterTime[i])
              filter.push(getShopTimeline[o]);
            }
          }
        }
        break;
      case "shop_id":
        filterShop = screen.dataShop.filter((data) =>
          String(data.description).toLowerCase().includes(filterScreen)
        );
        for (let i = 0;  filterShop.length > i; i++) {
          for (let o = 0; getShopTimeline.length > o; o++) {
            if (getShopTimeline[o].shop_id == filterShop[i].id) {
              filter.push(getShopTimeline[o]);
            }
          }
        }
        break;

    }
    setFilterData([...filter]);
  }, [filterScreen]);



  function screenDelete(timeline_id, shop_id) {
    setShowYesNoModal(true);
    setTimelineIdDelete(timeline_id)
    setShopId(shop_id)
    // deleteScreen(id)
  }


  function orderProviders(order) {
    const filter = [];
    const filterTime = [...screen.dataShop];
    const filterShop = [...timeline.data];
    switch (order) {
      case "id":
        filterShop.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
       
        for (let i = 0;  filterShop.length > i; i++) {
          for (let o = 0; getShopTimeline.length > o; o++) {
            if (getShopTimeline[o].timeline_id == filterShop[i].id) {
              filter.push(getShopTimeline[o]);
            }
          }
        }
        break;
      case "shop_id":
        filterTime.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        for (let i = 0;  filterTime.length > i; i++) {
          for (let o = 0; getShopTimeline.length > o; o++) {
            if (getShopTimeline[o].shop_id == filterTime[i].id) {
              filter.push(getShopTimeline[o]);
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
    <>
      {showYesNoModal && (
        <YesNoModal
          question="Tem certeza que deseja excluir?"
          action={() => ShopTimeline.deleteTimelineShop(timelineIdDelete, shopId)}
          close={() => {
            setShowYesNoModal(false);
          }}
        />
      )}
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th>Timeline</th>
            <th>Loja</th>
            <th>Opções</th>
          </tr>
          <tr>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("id")} />
              </span>
            </th>
            <th>
              <span>
                <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("shop_id")} />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {filterData.length > 0 ? filterData.map((data, index) => (
            <tr key={index}>

               <td>{timeline.data.map((timeline) => (
                  data.timeline_id == timeline.id ?
                    timeline.description : ''
                ))}</td>

                {/* <td>{data.shop_id}</td> */}
                <td>{screen.dataShop.map((shop) => (
                  data.shop_id == shop.id ?
                    shop.description : ''
                ))}</td>

              <td>
                <div className={styles.tableStyleButtons}>
                  {/* <Button
                    title="Editar"
                    type="button"
                    style="btnEdit"
                    onClick={() => {
                      handleClick(data)
                    }}>
                    <Create />
                  </Button> */}
                  <Button title="Excluir" type="button" style="btnDelete" onClick={() => { screenDelete(data.timeline_id, data.shop_id) }}>
                    <Delete />
                  </Button>
                </div>
              </td>
            </tr>
          )) :
            (getShopTimeline.map((data, index) => (
              <tr key={index}>

                <td>{timeline.data.map((timeline) => (
                  data.timeline_id == timeline.id ?
                    timeline.description : ''
                ))}</td>

                {/* <td>{data.shop_id}</td> */}
                <td>{screen.dataShop.map((shop) => (
                  data.shop_id == shop.id ?
                    shop.description : ''
                ))}</td>


                <td>
                  <div className={styles.tableStyleButtons}>
                    {/* <Button
                      title="Editar"
                      type="button"
                      style="btnEdit"
                      onClick={() => {
                        handleClick(data)
                      }}>
                      <Create />
                    </Button> */}
                    <Button title="Excluir" type="button" style="btnDelete" onClick={() => { screenDelete(data.timeline_id, data.shop_id) }}>
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            )))}
        </tbody>
      </table>
    </>
  )
}

export default ShopTimelineTable;