import React from "react";
import {
  GET_PROVIDER,
  POST_PROVIDER,
  PUT_PROVIDER,
  DELETE_PROVIDER,
} from "./api";
import { UserContext } from "./UserContext";

export const ProviderContext = React.createContext();

export const ProviderStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function loadProviders() {
    try {
      setError(null);
      setLoading(true);


      const { url, options } = GET_PROVIDER(userContext.session.session);


      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);

      if (response.ok) setData(json.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function createProvider(name) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = POST_PROVIDER(userContext.session.session, {
        description: name,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      loadProviders();
    }
  }

  async function updateProvider(name, id) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = PUT_PROVIDER(userContext.session.session, {
        id: id,
        description: name,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      loadProviders();
    }
  }

  async function deleteProvider(id) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = DELETE_PROVIDER(userContext.session.session, {
        id: id,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      loadProviders();
    }
  }

  return (
    <ProviderContext.Provider
      value={{
        data,
        error,
        loading,
        loadProviders,
        createProvider,
        updateProvider,
        deleteProvider,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
