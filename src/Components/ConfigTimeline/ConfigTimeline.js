import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './ConfigTimeline.module.css';
import Input from '../Forms/Input';
import { Done, Search } from '@material-ui/icons';
import Button from '../Forms/Button';
import { ScreenContext } from '../../Contexts/ScreenContext';
import { TimelineContext } from '../../Contexts/TimelineContext';
import { SCREEN, TIMELINE } from './constants';
import MovableItem from './MovableItem';
import Column from './Column';
import ModalTimeline from './ModalTimeline';

const ConfigTimeline = () => {
  const screenContext = React.useContext(ScreenContext);
  const timelineContext = React.useContext(TimelineContext);
  const [showTimelines, setShowTimelines] = React.useState(false);
  const [screens, setScreens] = React.useState([
    {
      id: 1,
      description: 'Tela1',
      time: '00:30:00',
      column: SCREEN,
      x: 0,
      width: 1800, // 30 minutes
      backColor: '#a6d77d',
    },
  ]);
  const [timeline, setTimeline] = React.useState({ interval: 0 });

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
          />
        ));
    }

    return [{}];
  };

  React.useEffect(() => {
    screenContext.loadScreen();
  }, []);

  React.useEffect(() => {
    const copyArray = [...screenContext.data];

    copyArray.forEach((screen) => {
      screen.x = 0;
      screen.width = timelineContext.calcSeconds(screen.time);
      screen.column = SCREEN;
      screen.backColor = getRandomColor();
    });
    setScreens([...copyArray]);
  }, [screenContext.data]);

  // console.log(screens);

  function getRandomColor() {
    let color = '#';
    const hexadecimal = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ];

    for (let i = 0; i < 6; i++) {
      color += hexadecimal[Math.floor(Math.random() * hexadecimal.length)];
    }

    return color;
  }

  // console.log(timeline);

  function done() {
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

      timelineContext.vinculateScreenTimeline(timeline.id, screen.id, time);
    });

    screenContext.loadScreen();

    setTimeline({ interval: 0 });
  }

  return (
    <div className={styles.containerConfigTimeline}>
      {showTimelines && (
        <ModalTimeline
          setShowTimelines={setShowTimelines}
          setTimeline={setTimeline}
          calcSeconds={timelineContext.calcSeconds}
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
              <h4 className={styles.subtitle}>Timeline</h4>
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
                      screenContext.loadScreen();
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
