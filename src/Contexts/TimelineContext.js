import React from 'react';
import {
  DELETE_TIMELINE,
  DELETE_TIMELINE_SCREEN,
  GET_TIMELINE,
  GET_TIMELINE_SCREEN,
  POST_TIMELINE,
  POST_TIMELINE_SCREEN,
  PUT_TIMELINE,
  PUT_TIMELINE_SCREEN,
} from '../api';
import NotificationError from '../Components/Notification/NotificationError';
import NotificationSucess from '../Components/Notification/NotificationSucess';
import { UserContext } from './UserContext';

export const TimelineContext = React.createContext();

export const TimelineStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const userContext = React.useContext(UserContext);
  const [vinculatedScreens, setVinculatedScreens] = React.useState([]);
  const [initialDuration, setInitialDuration] = React.useState('0:0:0');
  const [finalDuration, setFinalDuration] = React.useState('1:0:0');
  const [description, setDescription] = React.useState('');
  const [initialDate, setInitialDate] = React.useState('');
  const [finalDate, setFinalDate] = React.useState('');
  const [value, setValue] = React.useState([0, 3600]);

  async function loadTimelines() {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = GET_TIMELINE(userContext.session);

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

  async function createTimeline(
    description,
    initial_hour,
    final_hour,
    initial_date,
    final_date,
  ) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = POST_TIMELINE(userContext.session, {
        description: description,
        initial_hour: initial_hour,
        final_hour: final_hour,
        initial_date: formatDate(initial_date, 0),
        final_date: formatDate(final_date, 0),
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('A timeline foi adicionada');

      return true;
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
      loadTimelines();
    }
  }

  async function updateTimeline(
    id,
    description,
    initial_hour,
    final_hour,
    initial_date,
    final_date,
  ) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = PUT_TIMELINE(userContext.session, {
        id: id,
        description: description,
        initial_hour: initial_hour,
        final_hour: final_hour,
        initial_date: formatDate(initial_date, 0),
        final_date: formatDate(final_date, 0),
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('A timeline foi atualizada');

      return true;
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
      loadTimelines();
    }
  }

  async function deleteTimeline(id) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = DELETE_TIMELINE(userContext.session, { id: id });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('A timeline foi apagada');

      return true;
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
      loadTimelines();
    }
  }

  async function vinculateScreenTimeline(timeline_id, screen_id, initial_time) {
    try {
      setError(false);
      setLoading(true);

      const { url, options } = POST_TIMELINE_SCREEN(userContext.session, {
        timeline_id: timeline_id,
        screen_id: screen_id,
        initial_time: initial_time,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('Tela vinculada a timeline');
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateScreenTimeline(timeline_id, screen_id, initial_time) {
    try {
      setError(false);
      setLoading(true);

      const { url, options } = PUT_TIMELINE_SCREEN(userContext.session, {
        timeline_id: timeline_id,
        screen_id: screen_id,
        initial_time: initial_time,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('O vínculo foi atualizado com sucesso');
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeTimelineScreen(timeline_id, screen_id) {
    try {
      setLoading(true);
      setError(false);

      const { url, options } = DELETE_TIMELINE_SCREEN(userContext.session, {
        timeline_id: timeline_id,
        screen_id: screen_id,
      });

      const response = await fetch(url, options);

      const json = await response.json();

      if (json.error) {
        setError(json.message);
        NotificationError(json.message);
        return;
      }

      NotificationSucess('O vínculo foi removido com sucesso');
    } catch (error) {
      setError(error.message);
      NotificationError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function calcTime(seconds) {
    const total = seconds;
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total - hours * 3600) / 60);
    const sec = Math.floor(total % 60);

    return hours + ':' + minutes + ':' + sec;
  }

  function calcSeconds(time) {
    const total = time.split(':');
    const hours = Math.floor(+total[0] * 3600);
    const minutes = Math.floor(+total[1] * 60);
    const sec = Math.floor(+total[2]);

    return hours + minutes + sec;
  }

  function formatDate(date, type) {
    if (date === '') {
      return date;
    }

    const formatDate = date.split('-');
    const day = formatDate[2];
    const month = formatDate[1];
    const year = formatDate[0];

    if (type === 0) {
      return year + '-' + month + '-' + day;
    }

    return day + '-' + month + '-' + year;
  }

  return (
    <TimelineContext.Provider
      value={{
        loadTimelines,
        createTimeline,
        deleteTimeline,
        updateTimeline,
        data,
        error,
        initialDuration,
        setInitialDuration,
        finalDuration,
        setFinalDuration,
        description,
        setDescription,
        initialDate,
        setInitialDate,
        finalDate,
        setFinalDate,
        formatDate,
        calcTime,
        value,
        setValue,
        calcSeconds,
        loading,
        vinculateScreenTimeline,
        updateScreenTimeline,
        removeTimelineScreen,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};
