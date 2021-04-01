import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { SCREEN, TIMELINE } from './constants';
import { calcPercent, secondsToPixels } from './Column';

const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
  item,
  x,
  id,
  items,
  timeline,
  styles,
}) => {
  // Change item for column timeline or screen
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.id === item.id ? columnName : e.column,
        };
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName, type: 'Our first type', ...item },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;

        let canChangeColumn = true;

        let lastItem = { x: 0 };

        const timelineLimit = document
          .getElementById('timeline')
          .getBoundingClientRect().right;
        const timelineWidth = document
          .getElementById('timeline')
          .getBoundingClientRect().width;
        const percentNewItem = calcPercent(item.width, timeline.interval);
        const pxNewItem = secondsToPixels(percentNewItem, timelineWidth);

        items.forEach((itemf) => {
          if (itemf.column === TIMELINE) {
            const positionLastItem = document
              .getElementById(itemf.id)
              .getBoundingClientRect();
            if (positionLastItem.right > lastItem.x) {
              lastItem = itemf;
            }
          }
        });

        if (lastItem && lastItem.id && item.column === SCREEN) {
          const positionLastItem = document
            .getElementById(lastItem.id)
            .getBoundingClientRect();

          // Position of new item cant to surpass limit of timeline

          if (
            positionLastItem.right + pxNewItem > timelineLimit &&
            item.id !== lastItem.id
          ) {
            alert('nao pode mover coluna');
            canChangeColumn = false;
          }
        }

        if (pxNewItem > timelineWidth) {
          canChangeColumn = false;
        }

        if (canChangeColumn === true && timeline.interval !== null) {
          switch (name) {
            case TIMELINE:
              changeItemColumn(item, TIMELINE);
              break;
            case SCREEN:
              changeItemColumn(item, SCREEN);
              break;
            default:
              break;
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.3 : 0.8;

  drag(drop(ref));

  const widthItem = (item.width / timeline.interval) * 100;

  return (
    <div
      ref={ref}
      id={id}
      title={currentColumnName === TIMELINE ? item.description : ''}
      className={currentColumnName === SCREEN ? styles : {}}
      style={
        currentColumnName === TIMELINE
          ? {
              opacity,
              position: ' absolute',
              backgroundColor: item.backColor,
              height: '100%',
              cursor: 'move',
              color: '#fff',
              width: widthItem + '%',
              left: `${x}px`,
            }
          : {
              opacity,
              backgroundColor: '#4f4f4f',
              cursor: 'move',
              color: '#fff',
              width: '250px',
              margin: '0 1em',
              display: 'flex',
              marginTop: '30px',
            }
      }
    >
      {currentColumnName === SCREEN ? item.description + ' ' + item.time : ''}
    </div>
  );
};

export default MovableItem;
