import React from "react";
import styles from "./Record.module.css";
import { MediaContext } from "../../Contexts/MediaContext";
import { RecordContext } from "../../Contexts/RecordContext";
import { ViewList } from "@material-ui/icons";

const Record = () => {
  const mediaContext = React.useContext(MediaContext);
  const recordContext = React.useContext(RecordContext);
  const [media, setMedia] = React.useState([]);
  const [selectMedia, setSelectMedia] = React.useState();
  const [order, setOrder] = React.useState();

  React.useEffect(() => {
    mediaContext.loadMedia();
  }, []);

  React.useEffect(() => {
    setMedia(mediaContext.data)
  }, [mediaContext.data]);

  // React.useEffect(() => {
  //   console.log(recordContext.data)
  // }, [recordContext.data]);

  function handleClick() {
    recordContext.getRecord(selectMedia);
  }

  return (
    <div>
      <div className={styles.divHeader}>
        <p className={styles.p}>Mídia:</p>
        <select
          onChange={({ target }) => setSelectMedia(target.value)}
          value={selectMedia}
          className={styles.select}
        >
          <option value={0}>
            select
          </option>
          {media.map((data, index) => (
            <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
          ))}
        </select>

        <button onClick={() => handleClick()} className={styles.button}>Visualizar</button>

      </div>
      <div className={styles.tableArea}>
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              <th>Media</th>
              <th>Data</th>
              <th>Hora inicial</th>
              <th>Hora final</th>
              <th>Loja</th>
              <th>Deparmento</th>
            </tr>

            <tr>
              <th>
                <span onClick={() => setOrder("mediaId")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => setOrder("date")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => setOrder("initial")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => setOrder("final")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => setOrder("shop")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
              <th>
                <span onClick={() => setOrder("department")}>
                  <ViewList className={styles.tableStyleOrder} />
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {recordContext.data!=undefined&& recordContext.data.map((media) => (
                <tr key={media.id}>
                  <td>{media.media_id}</td>
                  <td>{media.date}</td>
                  <td>{media.initial_time}</td>
                  <td>{media.final_time}</td>
                  <td>{media.shop_id}</td>
                  <td>{media.department_id}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Record;

