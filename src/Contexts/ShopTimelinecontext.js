import React from "react";
import {
  GET_TIMELINE,
  GET_SHOPTIMELINE,
  POST_SHOPTIMELINE,
  DELETE_SHOPTIMELINE,
} from "../api";
import NotificationSucess from "../Components/Notification/NotificationSucess";
import { TimelineContext } from "./TimelineContext";
import { UserContext } from "./UserContext";


export const ShopTimelineContext = React.createContext();

export const ShopTimelineStorage = ({ children }) => {

  const [data, setData] = React.useState([]);
  const [timelineData, setTimelineData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const userContext = React.useContext(UserContext);
  const timeline = React.useContext(TimelineContext);




  React.useEffect(() => {
    if (timeline.data != null) setTimelineData(timeline.data)
  }, [timeline.data])

  React.useEffect(() => {
    if (timelineData != null) getTimelineShop()
  }, [timelineData])


  async function getTimelineShop() {

    try {
      setError(null);
      setLoading(true);
      let dataGet = [];
      for (let i = 0; timelineData.length > i; i++) {
        const { url, options } = GET_SHOPTIMELINE(userContext.session, timelineData[i].id);
        const response = await fetch(url, options);
        const json = await response.json();
        if (json.error) {
          if (json.message != 'No data') {
            setError(json.message);
          }
        }
        if (response.ok) dataGet.push(json.data);
      }
      setData(dataGet)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  async function postTimelineShop(timeline_id, shop_id) {

    try {
      setError(null);
      setLoading(true);
      const { url, options } = POST_SHOPTIMELINE(userContext.session, {
        'timeline_id': timeline_id,
        'shop_id': shop_id
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error) {
        console.log(json.message)
        setError(json.message)}
      if (!json.error) {

        getTimelineShop()
        NotificationSucess('Relação feita com sucesso')
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTimelineShop(timeline_id, shop_id) {

    try {
      setError(null);
      setLoading(true);
      const { url, options } = DELETE_SHOPTIMELINE(userContext.session, {
        'timeline_id': timeline_id,
        'shop_id': shop_id
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error) setError(json.message);
      if (response.ok) {
        getTimelineShop()
        NotificationSucess('Remoção feita com sucesso')
        console.log(json)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <ShopTimelineContext.Provider
      value={{
        data,
        error,
        loading,
        getTimelineShop,
        postTimelineShop,
        deleteTimelineShop
      }}
    >
      {children}
    </ShopTimelineContext.Provider>
  );
};
