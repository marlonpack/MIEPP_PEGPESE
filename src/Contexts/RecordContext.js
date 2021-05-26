import React, { useState, useEffect } from "react";

import { GET_RECORD } from "../api";
import { useHistory } from "react-router-dom";
import NotificationError from "../Components/Notification/NotificationError";
import NotificationSucess from "../Components/Notification/NotificationSucess";
import { UserContext } from "./UserContext";


export const RecordContext = React.createContext();
export const RecordStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState(undefined);

  async function getRecord(mediaId) {
    setData(undefined)
    try {
      // setLoading(true);
      const { url, options } = GET_RECORD(userContext.session, mediaId);
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error) {
        // setError(json.message);
        return
      }
      setData(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }



  return (
    <RecordContext.Provider
      value={{ getRecord, data}}
    >
      {children}
    </RecordContext.Provider>
  );
};