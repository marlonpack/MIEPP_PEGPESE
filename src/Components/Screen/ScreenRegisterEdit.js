import React from 'react';
import styles from "./ScreenRegisterEdit.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { ScreenContext } from "../../Contexts/ScreenContext";
import { MediaContext } from "../../Contexts/MediaContext";
import Product from '../Product/Product';
import { ProductContext } from '../../Contexts/ProductContext';

function ScreenRegisterEdit() {
  const mediaContext = React.useContext(MediaContext);
  const { dataDepartment, dataShop, dataEdit, openEditScreen, postScreen, putScreen } = React.useContext(ScreenContext);
  const{openModal, OpenModalProduct} = React.useContext(ProductContext);
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState('');
  const [media, setMedia] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [getMediaContext, setGetMediaContext]= React.useState([]);
  const [modalProduct, setModalProduct]= React.useState(false);

  
  React.useEffect(() => {
    mediaContext.loadMedia();
  },[]);

  // React.useEffect(()=>{
  //   OpenModalProduct
  // },[])

  React.useEffect(() => {
    setGetMediaContext(mediaContext.data);
  },[mediaContext.data]);

  React.useEffect(() => {
    if(dataEdit.length !==0){
    setDescription(dataEdit.description)
    setTime(dataEdit.time)
    setMedia(dataEdit.media_id)
    setDepartment(dataEdit.department_id)}
  },[dataEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    postScreen(description,time,media,department)
  }

  function screenEdit(){
    putScreen(dataEdit.id, description,time,media,department)
  }

  

  return (
    <div className={[styles.screenMenu, "animeLeft"].join(" ")}>
      {openModal && <Product media={media} department={department}/>}
      <h4 className="titleActionPage">Cadastrar / Editar Tela</h4>

      <form action="" onSubmit={handleSubmit}>
        <div className={styles.screenMenuFormTop}>
          <Input
            value={description}
            style={styles.screenMenuFormInput}
            label="Descrição"
            type="text"
            name="description"
            onChange={({ target }) =>  setDescription(target.value) }
          />

          <Input
            value={time}
            style={styles.screenMenuFormInput}
            label="Tempo"
            type="time"
            name="Time"
            onChange={({ target }) =>  setTime(target.value) }
            step='1'
          />
        </div>

        <div className={styles.screenMenuFormMiddle}>
          <div className={styles.screenMenuLeft}>
            <p>Mídia</p>
             <select
              onChange={({ target }) =>  setMedia(target.value)}
              value={media}
            >
              <option value='0'>Select</option>
              {getMediaContext.map((data, index)=>(
                <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
              ))}
            </select>
            <Button style={styles.buttonProduct} onClick={()=>{OpenModalProduct(!openModal)}} type="button">Produtos</Button>
          </div>

          <div className={styles.screenMenuRight}>
            <p>Departamento</p>
            <select
            // disabled={true}
              onChange={({ target }) =>  setDepartment(target.value) }
              value={department} 
            >
              <option>Select</option>
            
              {dataDepartment.map((data, index)=>(

                <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
              ))}
            </select>

            {openEditScreen ? <Button style={styles.button} type="button" onClick={()=>{screenEdit()}} >Editar</Button>: <Button style={styles.button} type="submit" >Enviar</Button>}
          </div>
        </div>
      </form>
    </div>
  )

}

export default ScreenRegisterEdit;