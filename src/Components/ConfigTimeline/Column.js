import React from 'react';
import { useDrop } from 'react-dnd';
import { SCREEN, TIMELINE } from './constants';

// Dropable area
const Column = ({ children, title, styles, items, setItems, id, timeline }) => {
  const [itemArrowMove, setItemArrowMove] = React.useState('');
  const [itemMove, setItemMove] = React.useState();

  //function calculates hours,mimute, seconds
  const getTime = (result) => {
    let hours = Math.floor(result / 3600);
    let minute = Math.floor((result - hours * 3600) / 60);
    let seconds = Math.trunc(result % 60);
    return { hours, minute, seconds };
  };
  // console.log(timeline)
  React.useEffect(() => {
    const timeLine = document.getElementById('timeline');
    const timeLinePosition = timeLine.getBoundingClientRect();
    //function to know how many pixels it has in  a second
    let intervalAndRight = timeline.interval / timeLinePosition.width;
    let espaceSecond = 1 / intervalAndRight;
    
    
    items.map((items) => {
      if (items.id === itemArrowMove.id) {
        const timelineHour = timeline.initial_hour.split(':');
        console.log(timelineHour)
        setItemMove(items);
        //calculation to know the seconds the screen starts 0.890625 + (0.890625*4 )
        let difference = items.x;
        let result = difference * (timeline.interval / timeLinePosition.width);
        // let result = difference *1451.80;
        console.log( espaceSecond, items, items.x, difference, result, timeline.interval, timeLinePosition.width, timeLinePosition.right,  timeLinePosition.left);
        const { hours, minute, seconds } = getTime(result);
        if (items.column == 'timeline') {
          document.querySelector(
            '#time',
          ).innerHTML = `a tela ${items.description} começa ${hours+ parseInt(timelineHour[0])}:${minute+ parseInt(timelineHour[1])}:${seconds+ parseInt(timelineHour[2])}`;
        }
      }
    });

    //function move screen with arrows
    const ArrowMoveItem = (event) => {
      itemMove && moveBox(items.id, itemMove.x);
      items.map((items) => {
        let calcPercent = Math.round((items.width / timeline.interval) * 100);
        let calcWidthPx = Math.round(
          (calcPercent * timeLinePosition.width) / 100,
        );
        if (items.id === itemArrowMove.id) {
          console.log(items)
          if (
            event.code === 'ArrowRight' &&
            items.column == 'timeline' &&
            items.x + calcWidthPx < timeLinePosition.right
            ) {
              // let x = items.x + espaceSecond + timeLinePosition.left;
              let x = items.x + timeLinePosition.left ;
              console.log('caiu', items.x, espaceSecond)
            let response = verifyColision(x, items);
            if (response) {
              moveBox(items.id, items.x + espaceSecond);
            } else {
              alert('você chegou ao limite');
              moveBox(items.id, items.x - espaceSecond);
            }
            // document.querySelector('#hoursTimeline').innerHTML = 'horas';
          } else if (
            event.code === 'ArrowLeft' &&
            items.column == 'timeline' &&
            items.x - espaceSecond > 0
          ) {
            let x = items.x + timeLinePosition.left - espaceSecond;
            let response = verifyColision(x, items);
            if (response) {
              moveBox(items.id, items.x - espaceSecond);
            } else {
              alert('você chegou ao limite');
            }
            document.querySelector('#time').innerHTML = 'horas';
          } 
        }
      });
    };
    document.addEventListener('keydown', ArrowMoveItem);
    return () => document.removeEventListener('keydown', ArrowMoveItem);
  }, [items]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),

    hover(item, monitor) {
      // document.querySelector('#hoursTimeline').innerHTML = 'horas';
      const timeLine = document.getElementById('timeline');
      const timeLinePosition = timeLine.getBoundingClientRect();
      const left = timeLinePosition.left;
      const timelineHour = timeline.initial_hour.split(':');
      let difference = monitor.getSourceClientOffset().x - left;
      let result = difference * (timeline.interval / timeLinePosition.width);
      const { hours, minute, seconds } = getTime(result);
      if (monitor.getSourceClientOffset().x <= timeLinePosition.right) {
        document.querySelector(
          '#time',
        ).innerHTML = `a tela ${item.name} começa ${hours+ parseInt(timelineHour[0])}:${minute+ parseInt(timelineHour[1])}:${seconds+ parseInt(timelineHour[2])}`;
      }
    },

    drop(item, monitor) {
      setItemArrowMove(item);
      if (item) {
        const delta = monitor.getSourceClientOffset();
        let specifyX = -1;

        let canChangeX = true;

        if (item.column === SCREEN) {
          const { canMove, position } = verifySpace(item);

          canChangeX = canMove;

          if (position !== -1) {
            specifyX = position;
          }
        }

        if (delta && canChangeX) {
          let x = 0;

          if (specifyX !== -1) {
            x = specifyX;
          } else {
            x = Math.round(delta.x);
          }

          const timeLine = document.getElementById('timeline');

          const timeLinePosition = timeLine.getBoundingClientRect();

          const canChangePosition = verifyColision(
            x,
            item,
            timeLinePosition.right,
          );

          // alert(canChangePosition);

          if (canChangePosition && timeline.interval !== null) {
            alert('movendo x');
            const left = timeLinePosition.left;
            const right = timeLinePosition.right;

            const calcPercentItem = calcPercent(item.width, timeline.interval);

            const calcWidthPxItem = secondsToPixels(
              calcPercentItem,
              timeLinePosition.width,
            );

            if (x > left && x + calcWidthPxItem < right) {
              const copyArray = items.filter(
                (item) => item.column === TIMELINE,
              );

              if (copyArray.length === 0) {
                x = 0;
              } else {
                x = x - timeLinePosition.x;
              }

              alert(`alterando eixo x do elemento para ${x}`);
              moveBox(item.id, x);
            } else {
              const copyArray = items.filter(
                (item) => item.column === TIMELINE,
              );

              if (copyArray.length === 0) {
                x = 0;
              } else {
                x = x - timeLinePosition.x;
              }

              if (x + calcWidthPxItem > right || x < left) {
                return;
              }

              alert(`alterando eixo x do elemento para ${x}`);
              moveBox(item.id, x);
            }
          }
        } else {
          alert('não pode mover x');
        }
      }

      return { name: title };
    },
  });

  function verifyColision(position, item) {
    let canMove = true;

    const timelineSpaceTotal = document
      .getElementById('timeline')
      .getBoundingClientRect().width;

    const timelineLimit = document
      .getElementById('timeline')
      .getBoundingClientRect().right;

    const calcPercentNewItem = calcPercent(item.width, timeline.interval);

    const calcWidthPxNewItem = secondsToPixels(
      calcPercentNewItem,
      timelineSpaceTotal,
    );

    items.map((itemf) => {
      if (itemf.id && itemf.column === TIMELINE) {
        let positionElement = document
          .getElementById(itemf.id)
          .getBoundingClientRect();

        if (
          (position > positionElement.left &&
            position < positionElement.right &&
            item.id !== itemf.id) ||
          (position + calcWidthPxNewItem > positionElement.left &&
            position < positionElement.right &&
            item.id !== itemf.id)
        ) {
          canMove = false;
        }
      }
    });

    if (position + calcWidthPxNewItem > timelineLimit) {
      canMove = false;
    }

    return canMove;
  }

  function verifySpace(item) {
    let response = { canMove: false, position: -1 };

    const timeLineSpaceTotal = document
      .getElementById('timeline')
      .getBoundingClientRect().width;
    const timeLineLimit = document
      .getElementById('timeline')
      .getBoundingClientRect().right;

    let timeTotalItems = 0;
    items.map((item) => {
      if (item.column) {
        timeTotalItems += item.width;
      }
    });

    const totalItemsPercent = calcPercent(timeTotalItems, timeline.interval);

    const totalItemsPx = secondsToPixels(totalItemsPercent, timeLineSpaceTotal);

    const calcPercentNewItem = calcPercent(item.width, timeline.interval);

    const calcWidthPxNewItem = secondsToPixels(
      calcPercentNewItem,
      timeLineSpaceTotal,
    );

    const spaceAvailable = totalItemsPx - calcWidthPxNewItem;

    if (calcWidthPxNewItem <= spaceAvailable) {
      let lastItem = { x: 0 };

      items.forEach((itemf) => {
        if (itemf.column === TIMELINE) {
          if (itemf.x >= lastItem.x) {
            lastItem = itemf;
          }
        }
      });

      if (lastItem && lastItem.id) {
        const positionLastItem = document
          .getElementById(lastItem.id)
          .getBoundingClientRect();

        if (positionLastItem.right + calcWidthPxNewItem > timeLineLimit) {
          alert('não pode mover, espaco insuficiente');

          response.canMove = false;
          response.position = -1;
          return response;
        } else {
          alert('especifico x');

          response.position = positionLastItem.right;
        }
      }

      response.canMove = true;
      return response;
    }

    response.position = -1;
    response.canMove = false;
    return response;
  }

  const moveBox = (id, left) => {
    const copyArray = [...items];

    copyArray.map((item) => {
      if (+item.id === +id) {
        item.x = left;
      }
    });

    setItems(copyArray);

    return copyArray;
  };

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return '#ddd';
      } else if (!canDrop) {
        return '#000';
      }
    } else {
      return '#2b2b2b';
    }
  };

  return (
    <div
      ref={drop}
      style={
        timeline.interval === 0 && title === TIMELINE
          ? { border: '1px solid red' }
          : { backgroundColor: getBackgroundColor() }
      }
      className={styles}
      id={id}
    >
      {children}
    </div>
  );
};

export function secondsToPixels(percent, space) {
  return (percent * space) / 100;
}

export function calcPercent(seconds, interval) {
  return (seconds / interval) * 100;
}

export default Column;
