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
import Column from './Column';

const ConfigTimeline = () => {
  const screenContext = React.useContext(ScreenContext);
  const timelineContext = React.useContext(TimelineContext);
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
  const [interval, setInterval] = React.useState(3600);

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
            interval={interval}
            setInterval={setInterval}
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
    });
    setScreens([...copyArray]);
  }, [screenContext.data]);

  // console.log(screens);

  return (
    <div className={styles.containerConfigTimeline}>
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
              {/* <div className={styles.screenColumn}>
                {screens.map((screen) => (
                  <div key={screen.id} className={styles.screen}>
                    {screen.description}
                  </div>
                ))}
                <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              <div className={styles.screen}></div>
              </div> */}
              {/* <div className={styles.screenColumn}></div> */}
              <Column
                title={TIMELINE}
                styles={styles.screenColumn}
                items={screens}
                setItems={setScreens}
                id="timeline"
                interval={interval}
                setInterval={setInterval}
              >
                {returnItemsForColumn(SCREEN)}
              </Column>
            </div>
            <div className={styles.contentSelectTimeline}>
              <h4 className={styles.subtitle}>Timeline</h4>
              <Button type="button" style={styles.btnSelectTimeline}>
                Selecionar Timeline
              </Button>
            </div>
            <div className={styles.contentMainTimeline}>
              <div className={styles.timelineColumn}></div>
            </div>
            <div className={styles.actions}>
              <Button type="button" style={styles.btnCancel}>
                Cancelar
              </Button>
              <Button type="button" style={styles.btnDone}>
                Finalizar
              </Button>
            </div>
          </section>
        </div>
      </DndProvider>
    </div>
  );
};

export default ConfigTimeline;
