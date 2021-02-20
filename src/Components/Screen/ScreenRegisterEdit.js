import React from 'react';
import styles from "./ScreenRegisterEdit.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { ScreenContext } from "../../Contexts/ScreenContext";

function ScreenRegisterEdit() {

  const [description, setDescription] = React.useState();
  const [time, setTime] = React.useState();
  const [media, setMedia] = React.useState();
  const [department, setDepartment] = React.useState();
  const { dataEdit, openEditScreen } = React.useContext(ScreenContext);


  React.useEffect(() => {
    console.log(dataEdit.id)
    console.log(dataEdit.description)
    console.log(dataEdit.time)
    console.log(dataEdit.media_id)
    console.log(dataEdit.department_id)
    console.log(dataEdit)
  }, [dataEdit])

  function handleSubmit(e) {
    e.preventDefault();
    console.log(description)
    console.log(time)
    console.log(media)
    console.log(department)
  }



  return (
    <div className={[styles.screenMenu, "animeLeft"].join(" ")}>
      <h4 className="titleActionPage">Cadastrar / Editar Tela</h4>

      <form action="" onSubmit={handleSubmit}>
        <div className={styles.screenMenuFormTop}>
          <Input
            value={dataEdit.description}
            style={styles.screenMenuFormInput}
            label="Descrição"
            type="text"
            name="description"
            onChange={({ target }) => { setDescription(target.value) }}
          />

          <Input
            value={dataEdit.time}
            style={styles.screenMenuFormInput}
            label="Tempo"
            type="time"
            name="Time"
            onChange={({ target }) => { setTime(target.value) }}
            step='1'
          />
        </div>

        <div className={styles.screenMenuFormMiddle}>
          <div className={styles.screenMenuLeft}>
            <p>Mídia</p>
            <select
              onChange={({ target }) => { setMedia(target.value) }}
            value={dataEdit.media_id}
            >
              <option>Select</option>
              <option value="3">BG </option>
              <option value="5">BG Test </option>
              <option value="6">BG Test 2 </option>
            </select>
            <Button style={styles.buttonProduct} type="submit">Produtos</Button>
          </div>

          <div className={styles.screenMenuRight}>
            <p>Departamento</p>
            <select
              onChange={({ target }) => { setDepartment(target.value) }}
              value={dataEdit.department_id} 
            >
              <option>Select</option>
              <option value='5'>Frios</option>
              <option value='6'>Frios</option>
            </select>

            <Button style={styles.button} type="submit" >Enviar</Button>
          </div>
        </div>
      </form>
    </div>
  )

}

export default ScreenRegisterEdit;