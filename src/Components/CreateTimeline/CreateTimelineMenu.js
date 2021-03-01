import React from "react";
import styles from "./CreateTimelineMenu.module.css";
import Slider from "@material-ui/core/Slider";
import { Alarm } from "@material-ui/icons";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { TimelineContext } from "../../Contexts/TimelineContext";

const CreateTimelineMenu = ({ clear, editTimeline }) => {
  const timelineContext = React.useContext(TimelineContext);

  const handleChange = (event, newValue) => {
    const initValue = newValue[0];
    const finalValue = newValue[1];

    const initTime = timelineContext.calcTime(initValue);
    const finalTime = timelineContext.calcTime(finalValue);

    timelineContext.setInitialDuration(initTime);
    timelineContext.setFinalDuration(finalTime);

    timelineContext.setValue(newValue);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    let response;

    if (editTimeline) {
      response = await timelineContext.updateTimeline(
        editTimeline.id,
        timelineContext.description,
        timelineContext.initialDuration,
        timelineContext.finalDuration,
        timelineContext.initialDate,
        timelineContext.finalDate
      );
    } else {
      response = await timelineContext.createTimeline(
        timelineContext.description,
        timelineContext.initialDuration,
        timelineContext.finalDuration,
        timelineContext.initialDate,
        timelineContext.finalDate
      );
    }

    if (response) {
      clear();
    }
  }

  return (
    <div className={[styles.createTimelineMenu, "animeLeft"].join(" ")}>
      <h4 className="titleActionPage">Cadastrar / Editar Timelines</h4>

      <form action="" onSubmit={handleSubmit}>
        <div className={styles.timelineFormDescription}>
          <label htmlFor="description">Descrição</label>
          <textarea
            value={timelineContext.description}
            onChange={({ target }) =>
              timelineContext.setDescription(target.value)
            }
            name="description"
            id="description"
            spellCheck="false"
            rows="5"
          ></textarea>
        </div>
        <div className={styles.timelineFormTime}>
          <p htmlFor="timelineDuration">
            Horário <Alarm className={styles.clockIcon} />
          </p>

          <Slider
            min={0}
            max={86399}
            value={timelineContext.value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="off"
          />

          <div className={styles.infoDuration}>
            <p className={styles.initialDuration}>
              Começa {timelineContext.initialDuration}{" "}
            </p>
            <p className={styles.finalDuration}>
              Termina {timelineContext.finalDuration}
            </p>
          </div>
        </div>
        <div className={styles.timelineFormDates}>
          <Input
            label="Data inicial"
            name="initialDate"
            id="initialDate"
            type="date"
            style={styles.btnInitialDateStyle}
            value={timelineContext.initialDate}
            onChange={({ target }) =>
              timelineContext.setInitialDate(target.value)
            }
          />
          <Input
            label="Data final"
            name="finalDate"
            id="finalDate"
            type="date"
            style={styles.btnFinalDateStyle}
            value={timelineContext.finalDate}
            onChange={({ target }) =>
              timelineContext.setFinalDate(target.value)
            }
          >
            Data final
          </Input>
        </div>

        <div className={styles.createTimelineBotttom}>
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTimelineMenu;
