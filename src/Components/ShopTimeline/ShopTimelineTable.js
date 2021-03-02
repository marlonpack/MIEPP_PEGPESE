import React from 'react';
import Button from "../Forms/Button";
import { ScreenContext } from "../../Contexts/ScreenContext";
import YesNoModal from "../YesNoModal/YesNoModal";
import { ViewList, Create, Delete, ShoppingCart } from "@material-ui/icons";
import styles from './ShopTimelineTable.module.css';
import { ShopTimelineContext } from '../../Contexts/ShopTimelinecontext';



function ShopTimelineTable({ typeSearch, filterScreen }) {
 

  const [filterData, setFilterData] = React.useState([]);
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
  const [timelineIdDelete, setTimelineIdDelete] = React.useState('');
  const [shopId, setShopId] = React.useState('');
  const [getShopTimeline, setGetShopTimeline] = React.useState([]);
  const ShopTimeline = React.useContext(ShopTimelineContext);

  

  React.useEffect(() => {
    let test = []
    ShopTimeline.data.forEach((timeline) => {
      if(ShopTimeline.data.length >0)
      test.push(...timeline)
      })
      setGetShopTimeline( test);
    }, [ShopTimeline.data]);
    
    
  

  React.useEffect(() => {
    let filter = [];
    switch (typeSearch) {
      case "id":
        filter = getShopTimeline.filter((data) =>
          String(data.timeline_id).toLowerCase().includes(filterScreen)
        );
        break;
      case "shop_id":
        filter = getShopTimeline.filter((data) =>
          String(data.shop_id).toLowerCase().includes(filterScreen)
        );
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
    const filter = [getShopTimeline];
    switch (order) {
      case "id":
        filter.sort();
        break;
      case "shop_id":
        filter.sort(function (a, b) {
          if (a.media_id > b.media_id) return 1;
          if (a.media_id < b.media_id) return -1;
          return 0;
        });
        break;
      default:
        return;
    }
    setFilterData(...filter);
  }
  
  
  return(
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
              <td>{data.timeline_id}</td>
              <td>{data.shop_id}</td>
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
   
                <td>{data.timeline_id}</td>
                <td>{data.shop_id}</td>
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