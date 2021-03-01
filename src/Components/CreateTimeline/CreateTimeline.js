import React from "react";
import Input from "../Forms/Input";
import { AddBox, Search } from "@material-ui/icons";
import Button from "../Forms/Button";
import styles from "./CreateTimeline.module.css";
import CreateTimelineTable from "./CreateTimelineTable";
import CreateTimelineMenu from "./CreateTimelineMenu";
import { TimelineContext } from "../../Contexts/TimelineContext";
import YesNoModal from "../YesNoModal/YesNoModal";

const CreateTimeline = () => {
  const timelineContext = React.useContext(TimelineContext);
  const [showMenu, setShowMenu] = React.useState();
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
  const [delTimeline, setDelTimeline] = React.useState(null);
  const [editTimeline, setEditTimeline] = React.useState(null);
  const [filterData, setFilterData] = React.useState([]);
  const [typeSearch, setTypeSearch] = React.useState("");

  React.useEffect(() => {
    if (typeSearch === "") {
      setFilterData([]);
      document.getElementById("searchTimeline").value = "";
    }
  }, [typeSearch]);

  React.useEffect(() => {
    timelineContext.loadTimelines();
  }, []);

  React.useEffect(() => {
    if (editTimeline !== null) {
      timelineContext.setDescription(editTimeline.description);
      const initialDate =
        editTimeline.initial_date === null ? "" : editTimeline.initial_date;
      const finalDate =
        editTimeline.final_date === null ? "" : editTimeline.final_date;
      const initialHour = timelineContext.calcSeconds(
        editTimeline.initial_hour
      );
      const finalHour = timelineContext.calcSeconds(editTimeline.final_hour);

      timelineContext.setInitialDate(initialDate);
      timelineContext.setFinalDate(finalDate);
      timelineContext.setValue([initialHour, finalHour]);
      timelineContext.setInitialDuration(editTimeline.initial_hour);
      timelineContext.setFinalDuration(editTimeline.final_hour);
    }
  }, [editTimeline]);

  function clear() {
    timelineContext.setDescription("");
    timelineContext.setInitialDate("");
    timelineContext.setFinalDate("");
    timelineContext.setInitialDuration("0:0:0");
    timelineContext.setFinalDuration("1:0:0");
    timelineContext.setValue([0, 3600]);
    setEditTimeline(null);
  }

  function searchTimeline(search) {
    if (typeSearch === "") {
      setFilterData([]);
      return;
    }

    let filter = [];

    const timelineDesc = search.toLowerCase();

    switch (typeSearch) {
      case "description":
        filter = timelineContext.data.filter((timeline) =>
          timeline.description.toLowerCase().includes(timelineDesc)
        );
        break;

      case "id":
        filter = timelineContext.data.filter((timeline) =>
          String(timeline.id).includes(search)
        );
        break;
      case "initialDate":
        filter = timelineContext.data.filter((timeline) =>
          String(timeline.initial_date).includes(search)
        );

        break;
      case "finalDate":
        filter = timelineContext.data.filter((timeline) =>
          String(timeline.final_date).includes(search)
        );

        break;
    }

    setFilterData(filter ? [...filter] : []);
  }

  return (
    <div className={styles.containerCreateTimeline}>
      {showYesNoModal && (
        <YesNoModal
          action={() => timelineContext.deleteTimeline(delTimeline)}
          question="Deseja apagar esta timeline?"
          close={() => setShowYesNoModal(false)}
        />
      )}
      <div className={styles.topCreateTimeline}>
        <div className={styles.topCreateTimelineLeft}>
          <Button
            type="button"
            style="btnAdd"
            onClick={() => (clear(), setShowMenu(!showMenu))}
          >
            <AddBox />
          </Button>

          <h3 className="titleSection">Lista de Timelines</h3>
        </div>
        <div className={styles.topCreateTimelineRight}>
          <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="description">Descrição</option>
            <option value="id">ID</option>
            <option value="initialDate">Data inicial</option>
            <option value="finalDate">Data final</option>
          </select>
          <Input
            style={styles.topCreateTimelineForm}
            label="Pesquisar"
            type="text"
            id="searchTimeline"
            name="searchTimeline"
            onChange={({ target }) => searchTimeline(target.value)}
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>

      <div className={styles.mainCreateTimeline}>
        {showMenu && (
          <CreateTimelineMenu clear={clear} editTimeline={editTimeline} />
        )}
        <CreateTimelineTable
          showMenu={showMenu}
          data={timelineContext.data}
          setShowYesNoModal={setShowYesNoModal}
          setDelTimeline={setDelTimeline}
          setEditTimeline={setEditTimeline}
          setShowMenu={setShowMenu}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </div>
    </div>
  );
};

export default CreateTimeline;
