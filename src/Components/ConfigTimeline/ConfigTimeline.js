import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './ConfigTimeline.module.css';
import Input from '../Forms/Input';
import { Search } from '@material-ui/icons';
import Button from '../Forms/Button';
import { ScreenContext } from '../../Contexts/ScreenContext';
import { TimelineContext } from '../../Contexts/TimelineContext';
import { SCREEN, TIMELINE } from './constants';
import MovableItem from './MovableItem';
import Column, { secondsToPixels } from './Column';
import ModalTimeline from './ModalTimeline';
import { GET_TIMELINE_SCREEN } from '../../api';
import { UserContext } from '../../Contexts/UserContext';
import { MediaContext } from '../../Contexts/MediaContext';
import VideoModal from '../VideoModal/VideoModal';
import ImageModal from '../ImageModal/ImageModal';

const ConfigTimeline = () => {
  const screenContext = React.useContext(ScreenContext);
  const userContext = React.useContext(UserContext);
  const mediaContext = React.useContext(MediaContext);
  const timelineContext = React.useContext(TimelineContext);
  const [showTimelines, setShowTimelines] = React.useState(false);
  const [screens, setScreens] = React.useState([]);
  const [timeline, setTimeline] = React.useState({ interval: 0 });
  const [updateScreens, setUpdateScreens] = React.useState([]);
  const [removeScreens, setRemoveScreens] = React.useState([]);
  const [showVideo, setShowVideo] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [image, setImage] = React.useState(false);

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = screens[dragIndex];

    if (dragItem) {
      setScreens((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName) => {
    if (screens) {
      return screens
        .filter((item) => item.column === columnName)
        .map((item, index) => (
          <MovableItem
            id={item.id}
            styles={styles.screen}
            key={item.id}
            name={item.description}
            item={item}
            items={screens}
            currentColumnName={item.column}
            setItems={setScreens}
            index={index}
            x={item.x}
            timeline={timeline}
            setTimeline={setTimeline}
            moveCardHandler={moveCardHandler}
            setShowVideo={setShowVideo}
            showImage={showImage}
            setVideo={setVideo}
            showVideo={showVideo}
            setShowImage={setShowImage}
            setImage={setImage}
            setRemoveScreens={setRemoveScreens}
            verifyIfScreenExistOnData={verifyIfScreenExistOnData}
          />
        ));
    }

    return [{}];
  };

  React.useEffect(() => {
    screenContext.loadScreen();
  }, []);

  React.useEffect(async () => {
    const copyArray = [...screenContext.data];

    copyArray.forEach((screen) => {
      screen.x = 0;
      screen.width = timelineContext.calcSeconds(screen.time);
      screen.column = SCREEN;
      screen.backColor = '#474747';
      mediaContext.getMediaType(screen.media_id).then((response) => {
        screen.media_type = response[0].type;
        if (
          +response[0].type === 0 ||
          +response[0].type === 1 ||
          +response[0].type === 3
        ) {
          mediaContext
            .loadMediaFile(screen.media_id)
            .then((media) => (screen.media = media[0]));
        }
      });
    });
    setScreens([...copyArray]);
  }, [screenContext.data]);

  function done() {
    removeScreensDatabase();

    const screensTimeline = screens.filter(
      (screen) => screen.column === TIMELINE,
    );

    const timelineContainer = document
      .getElementById('timeline')
      .getBoundingClientRect();
    const interval = timeline.interval;

    screensTimeline.forEach((screen) => {
      const difference = screen.x - 0;
      let result = difference * (interval / timelineContainer.width);
      result += timelineContext.calcSeconds(timeline.initial_hour);
      const time = timelineContext.calcTime(result);

      if (verifyIfScreenExistOnData(screen) === true) {
        timelineContext.updateScreenTimeline(timeline.id, screen.id, time);
      } else {
        timelineContext.vinculateScreenTimeline(timeline.id, screen.id, time);
      }
    });

    screenContext.loadScreen();

    setTimeline({ interval: 0 });
    setUpdateScreens([]);
  }

  function removeScreensDatabase() {
    if (removeScreens.length > 0) {
      removeScreens.forEach((screen) => {
        timelineContext.removeTimelineScreen(timeline.id, screen.id);
      });
    }
  }

  function verifyIfScreenExistOnData(screen) {
    return updateScreens.some((item) => item.screen_id === screen.id);
  }

  React.useEffect(() => {
    async function getTimelineScreens() {
      try {
        const { url, options } = GET_TIMELINE_SCREEN(
          userContext.session,
          timeline.id,
        );

        const response = await fetch(url, options);

        const json = await response.json();

        if (json.error) {
          console.log(json.error);
          return;
        }

        return json.data;
      } catch (error) {
        console.log(error);
      }
    }
    let copyArray = [...screens];

    copyArray.forEach((screen) => (screen.column = SCREEN));

    if (timeline.id) {
      getTimelineScreens().then((response) => {
        console.log(response);
        setUpdateScreens([...response]);
        if (response) {
          copyArray.forEach((screen) => {
            response.forEach((screenTimeline) => {
              if (screen.id == screenTimeline.screen_id) {
                screen.x = calcPositionX(
                  timelineContext.calcSeconds(screenTimeline.initial_time),
                  timelineContext.calcSeconds(timeline.initial_hour),
                  timeline.interval,
                );
                screen.width = timelineContext.calcSeconds(
                  screenTimeline.total_time,
                );
                screen.column = TIMELINE;
                screen.backColor = '#474747';
              }
            });
          });
          setScreens([...copyArray]);
        }
      });
    } else {
      setUpdateScreens([]);
    }
  }, [timeline]);

  function calcPositionX(initialScreen, initialTimeline, interval) {
    const posInterval = Math.abs(initialScreen - initialTimeline);

    const calcPercent = (posInterval / interval) * 100;

    const timelineLimit = document
      .getElementById('timeline')
      .getBoundingClientRect().width;

    const calcPosPx = secondsToPixels(calcPercent, timelineLimit);

    return calcPosPx;
  }

  function clearList() {
    const copyArray = [...screens];
    copyArray.forEach((screen) => (screen.column = SCREEN));
    setScreens([...copyArray]);
    setUpdateScreens([]);
    setRemoveScreens([]);
  }

  return (
    <div className={styles.containerConfigTimeline}>
      {showTimelines && (
        <ModalTimeline
          setShowTimelines={setShowTimelines}
          setTimeline={setTimeline}
          calcSeconds={timelineContext.calcSeconds}
          screenContext={screenContext}
        />
      )}

      {showImage && (
        <ImageModal
          close={() => {
            setShowImage(false);
            setImage(null);
          }}
          src={image}
        />
      )}

      {showVideo && (
        <VideoModal
          close={() => {
            setShowVideo(false);
            setVideo(null);
          }}
          src={video}
        />
      )}
      <DndProvider backend={HTML5Backend}>
        <div className={styles.contentConfigTimeline}>
          <section className={styles.contentTitlePage}>
            <h3 className="titleSection">Configuração de timeline</h3>
          </section>
          <section className={styles.contentMain}>
            <div className={styles.contentMainTop}>
              <h4 className={styles.subtitle}>Telas</h4>
              <article className={styles.contentMainSearch}>
                <Input
                  type="text"
                  label="Pesquisar"
                  name="searchScreen"
                  id="searchScreen"
                  style={styles.searchScreen}
                />
                <Button type="button" style="btnSearch">
                  <Search />
                </Button>
              </article>
            </div>
            <div className={styles.contentMainScreens}>
              <Column
                title={SCREEN}
                styles={styles.screenColumn}
                items={screens}
                setItems={setScreens}
                id="screen"
                timeline={timeline}
                setTimeline={setTimeline}
              >
                {returnItemsForColumn(SCREEN)}
              </Column>
            </div>
            <div className={styles.contentSelectTimeline}>
              <h4 className={styles.subtitle}>
                Timeline: {timeline.id ? timeline.description : ''}
              </h4>
              <h3 id="time"></h3>
              <Button
                type="button"
                style={styles.btnSelectTimeline}
                onClick={() => setShowTimelines(true)}
              >
                Selecionar Timeline
              </Button>
            </div>
            <div className={styles.contentMainTimeline}>
              <Column
                title={TIMELINE}
                styles={styles.timelineColumn}
                items={screens}
                setItems={setScreens}
                id="timeline"
                timeline={timeline}
                setTimeline={setTimeline}
              >
                {returnItemsForColumn(TIMELINE)}
              </Column>
            </div>
            <div className={styles.actions}>
              {timeline.interval !== 0 && (
                <>
                  <Button
                    type="button"
                    style={styles.btnCancel}
                    onClick={() => {
                      setTimeline({ interval: 0 });
                      clearList();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    style={styles.btnDone}
                    onClick={() => done()}
                  >
                    Finalizar
                  </Button>
                </>
              )}
            </div>
          </section>
        </div>
      </DndProvider>
    </div>
  );
};

export default ConfigTimeline;
