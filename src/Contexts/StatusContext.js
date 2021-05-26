import React from 'react';
import {
  GET_STATUS
} from '../api';
import NotificationError from '../Components/Notification/NotificationError';
import NotificationSucess from '../Components/Notification/NotificationSucess';
import { UserContext } from './UserContext';

export const StatusContext = React.createContext();

export const StatusStorage = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const userContext = React.useContext(UserContext);


  async function getStatus() {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = GET_STATUS();
      const response = await fetch(url, options);
      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }

      setData(json.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <StatusContext.Provider
      value={{getStatus, data}}
    >
      {children}
    </StatusContext.Provider>
  );
};
