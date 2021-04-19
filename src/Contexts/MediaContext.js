import React from 'react';
import { UserContext } from './UserContext';
import {
  DELETE_MEDIA,
  GET_MEDIA,
  GET_MEDIA_FILE,
  GET_MEDIA_TYPE,
  POST_MEDIA,
  PUT_MEDIA,
} from '../api';
import NotificationSucess from '../Components/Notification/NotificationSucess';
import NotificationError from '../Components/Notification/NotificationError';

export const MediaContext = React.createContext();

export const MediaStorage = ({ children }) => {
  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function loadMedia() {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = GET_MEDIA(userContext.session);

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      if (response.ok) setData(json.data);
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadMediaFile(id, type) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = GET_MEDIA_FILE(userContext.session, id);

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      if (response.ok) setFile({ file: json.data[0], type: type });
      return json.data;
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
      return {};
    } finally {
      setLoading(false);
    }
  }

  async function createMedia(description, type, file, supplier_id) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = POST_MEDIA(userContext.session, {
        description: description,
        type: type,
        file: file,
        supplier_id: supplier_id,
      });
      const response = await fetch(url, options);
      
      const json = await response.json();
      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('A mídia foi adicionada');
      return true;
    } catch (error) {
      console.log(error);
      setError(error.message);
      NotificationError(error.message);
    } finally {
      loadMedia();
      setLoading(false);
    }
  }

  async function updateMedia(id, description, type, file, supplier_id) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = PUT_MEDIA(userContext.session, {
        id: id,
        description: description,
        type: type,
        file: file,
        supplier_id: supplier_id,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('A mídia foi atualizada');
      return true;
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      loadMedia();
      setLoading(false);
    }
  }

  async function deleteMedia(id) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = DELETE_MEDIA(userContext.session, { id: id });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }
      NotificationSucess('A mídia foi apagada');
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
      loadMedia();
    }
  }

  async function getMediaType(id) {
    try {
      setError(false);
      setLoading(false);

      const { url, options } = GET_MEDIA_TYPE(userContext.session, id);

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return {};
      }

      return json.data;
    } catch (error) {
      setError(error.message);
      return {};
    } finally {
      setLoading(false);
    }
  }

  return (
    <MediaContext.Provider
      value={{
        createMedia,
        loadMedia,
        deleteMedia,
        loadMediaFile,
        updateMedia,
        data,
        file,
        error,
        loading,
        getMediaType,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
