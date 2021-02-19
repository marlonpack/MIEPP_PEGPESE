import React from "react";
import { UserContext } from "./UserContext";
import {
  DELETE_MEDIA,
  GET_MEDIA,
  GET_MEDIA_FILE,
  POST_MEDIA,
  PUT_MEDIA,
} from "../api";

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
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);

      if (response.ok) setData(json.data);
    } catch (error) {
      setError(error.message);
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

      if (!response.ok) throw new Error(`Error: ${json.message}`);

      if (response.ok) setFile({ file: json.data[0], type: type });
    } catch (error) {
      setError(error.message);
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
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);
    } catch (error) {
      setError(error.message);
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
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);
    } catch (error) {
      setError(error.message);
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
      }

      if (!response.ok) throw new Error(`Error: ${json.message}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      loadMedia();
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
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
