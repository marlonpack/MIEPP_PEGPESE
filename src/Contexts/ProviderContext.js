import React from "react";
import {
  GET_PROVIDERS,
  GET_PROVIDER,
  POST_PROVIDER,
  PUT_PROVIDER,
  DELETE_PROVIDER,
} from "../api";
import NotificationSucess from "../Components/Notification/NotificationSucess";
import { UserContext } from "./UserContext";

export const ProviderContext = React.createContext();

export const ProviderStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [provider, setProvider] = React.useState([]);

  async function loadProviders() {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = GET_PROVIDERS(userContext.session);

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
      }

      if (response.ok) setData(json.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadProvider(id) {
    const data = provider.filter((provider) => provider.id === id);

    if (data.length === 0) {
      try {
        setError(null);
        setLoading(true);

        const { url, options } = GET_PROVIDER(userContext.session, id);

        const response = await fetch(url, options);

        const json = await response.json();

        if (json.error) {
          setError(json.message);
        }

        if (response.ok)
          setProvider((oldarray) => [...oldarray, { ...json.data[0], id: id }]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  async function createProvider(name) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = POST_PROVIDER(userContext.session, {
        description: name,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        return;
      }

      NotificationSucess("O fornecedor foi adicionado");
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

      const { url, options } = PUT_PROVIDER(userContext.session, {
        id: id,
        description: name,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        return;
      }
      NotificationSucess("O fornecedor foi atualizado");
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

      const { url, options } = DELETE_PROVIDER(userContext.session, {
        id: id,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        return;
      }

      NotificationSucess("O fornecedor foi apagado");
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
        provider,
        loadProviders,
        createProvider,
        updateProvider,
        deleteProvider,
        loadProvider,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
