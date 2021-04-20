import React from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import styles from './ModalTimeline.module.css';
import { Search, ViewList } from '@material-ui/icons';
import { TimelineContext } from '../../Contexts/TimelineContext';
import { ScreenContext } from '../../Contexts/ScreenContext';
import useOutsideClick from '../../Hooks/useOutsideClick';

const ModalTimeline = ({ setShowTimelines, setTimeline, calcSeconds }) => {
  const timelineContext = React.useContext(TimelineContext);
  const screenContext = React.useContext(ScreenContext);
  const [filterData, setFilterData] = React.useState([]);

  React.useEffect(() => {
    timelineContext.loadTimelines();
  }, []);

  let domNode = useOutsideClick(() => {
    setShowTimelines(false);
  });

  function searchTimeline(search) {
    const input = search.toLowerCase();
    const filter = timelineContext.data.filter((timeline) =>
      timeline.description.toLowerCase().includes(input),
    );
    setFilterData([...filter]);
    if (!filter.length) setFilterData([{}]);
  }

  return (
    <div className={styles.containerModal}>
      <div className={styles.modal} ref={domNode}>
        <section className={styles.modalTop}>
          <Input
            label="Pesquisar"
            id="searchTimeline"
            name="searchTimeline"
            type="text"
            style={styles.searchTimeline}
            onChange={({ target }) => searchTimeline(target.value)}
          />
          <Button type="button" style={`btnSearch ${styles.btnSearchTimeline}`}>
            <Search />
          </Button>
        </section>
        <section className={styles.modalMain}>
          <table className={styles.tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Data inicial</th>
                <th>Data final</th>
                <th>Horário inicial</th>
                <th>Horário final</th>
              </tr>
            </thead>

            <tbody>
              {filterData.length
                ? filterData.map((timeline) => (
                    <tr
                      key={timeline.id}
                      onClick={() => {
                        const initial = calcSeconds(timeline.initial_hour);
                        const final = calcSeconds(timeline.final_hour);
                        let item = { ...timeline, interval: final - initial };
                        setTimeline(item);
                        setShowTimelines(false);
                      }}
                    >
                      <td>{timeline.id}</td>
                      <td>{timeline.description}</td>
                      <td>{timeline.initial_date}</td>
                      <td>{timeline.final_date}</td>
                      <td>{timeline.initial_hour}</td>
                      <td>{timeline.final_hour}</td>
                    </tr>
                  ))
                : timelineContext.data &&
                  timelineContext.data.map((timeline) => (
                    <tr
                      key={timeline.id}
                      key={timeline.id}
                      onClick={() => {
                        screenContext.loadScreen();
                        const initial = calcSeconds(timeline.initial_hour);
                        const final = calcSeconds(timeline.final_hour);
                        let item = { ...timeline, interval: final - initial };
                        setTimeline(item);
                        setShowTimelines(false);
                      }}
                    >
                      <td>{timeline.id}</td>
                      <td>{timeline.description}</td>
                      <td>{timeline.initial_date}</td>
                      <td>{timeline.final_date}</td>
                      <td>{timeline.initial_hour}</td>
                      <td>{timeline.final_hour}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default ModalTimeline;
