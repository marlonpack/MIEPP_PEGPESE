import React from 'react';
import styles from "./ScreenRegisterEdit.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { ScreenContext } from "../../Contexts/ScreenContext";
import { MediaContext } from "../../Contexts/MediaContext";


function ScreenRegisterEdit() {
  const mediaContext = React.useContext(MediaContext);
  const { dataDepartment, dataShop, dataEdit, openEditScreen, postScreen, putScreen } = React.useContext(ScreenContext);
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState('');
  const [media, setMedia] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [getMediaContext, setGetMediaContext] = React.useState([]);


  const [getSelectMedia, setGetSelectMedia] = React.useState([]);
  const [filemedia, setFilemedia] = React.useState([]);


  React.useEffect(() => {
    mediaContext.loadMedia();
  }, []);

  
  React.useEffect(()=>{
    for (let a = 0; mediaContext.data.length > a; a++) {
      if (mediaContext.data[a].id === parseInt(media)) {
        mediaContext.loadMediaFile(mediaContext.data[a].id, mediaContext.data[a].type)
      }
    }
  },[media])


  React.useEffect(() => {
    if (mediaContext.file != null)
    setFilemedia(mediaContext.file.file);
    // if(mediaContext.file.file.includes('video')) {console.log(mediaContext.file.file, 'video')}
    // else
    // {console.log(mediaContext.file.file, 'img')}}
  }, [mediaContext.file]);



  React.useEffect(() => {
    setGetMediaContext(mediaContext.data);
  }, [mediaContext.data]);


  React.useEffect(() => {
    if (dataEdit.length !== 0) {
      setDescription(dataEdit.description)
      setTime(dataEdit.time)
      setMedia(dataEdit.media_id)
      setDepartment(dataEdit.department_id)
    }
  }, [dataEdit]);
  
  React.useEffect(() => {
    for (let i = 0; getMediaContext.length > i; i++) {
      if (getMediaContext[i].id === parseInt(media)) {
        setGetSelectMedia(getMediaContext[i])
      }
    }
  }, [media]);

  function handleSubmit(e) {
    e.preventDefault();
    postScreen(description, time, media, department)
  }

  function screenEdit() {
    putScreen(dataEdit.id, description, time, media, department)
  }
  
  


  function handleChangeMedia(value) {
    for (let i = 0; getMediaContext.length > i; i++) {
      if (getMediaContext[i].id === parseInt(value)) {
        setGetSelectMedia(getMediaContext[i])
      }
    }
  }



  return (
    <div className={[styles.screenMenu, "animeLeft"].join(" ")}>
      <h4 className="titleActionPage" style={{height: '10%'}}>Cadastrar / Editar Tela</h4>

      <form action="" onSubmit={handleSubmit} style={{height:'45%'}}>
        <div className={styles.screenMenuFormTop}>
          <Input
            value={description}
            style={styles.screenMenuFormInput}
            label="Descrição"
            type="text"
            name="description"
            onChange={({ target }) => setDescription(target.value)}
          />

          <Input
            value={time}
            style={styles.screenMenuFormInput}
            label="Tempo"
            type="time"
            name="Time"
            onChange={({ target }) => setTime(target.value)}
            step='1'
          />
        </div>

        <div className={styles.screenMenuFormMiddle}>
          <div className={styles.screenMenuLeft}>
            <p>Mídia</p>
            <select
              onChange={({ target }) => {
                setMedia(target.value)
                handleChangeMedia(target.value)
              }}
              value={media}
            >
              <option value='0'>Select</option>
              {getMediaContext.map((data, index) => (
                <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
              ))}
            </select>
          </div>

          <div className={styles.screenMenuRight}>
            <p>Departamento</p>
            <select
              disabled={getSelectMedia.type == 3 || getSelectMedia.type == 4 ? true : false}
              onChange={({ target }) => setDepartment(target.value)}
              value={department}
            >
              <option>Select</option>
              {dataDepartment.map((data, index) => (
                <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
              ))}
            </select>

            {openEditScreen ?
              <Button style={styles.button} type="button" onClick={() => { screenEdit() }} >Editar</Button> :
              <Button style={styles.button} type="submit" >Enviar</Button>}
          </div>
        </div>
      </form>
      <div style={{height:'45%', width:'100%'}}>
      {filemedia.includes('video')?
      <video src={filemedia} autoPlay={true} controls style={{height:'100%', width:'100%'}}/>
      :
      <img src={filemedia} style={{height:'100%', width:'100%'}}/>
        }
      </div>
    </div>
  )

}

export default ScreenRegisterEdit;