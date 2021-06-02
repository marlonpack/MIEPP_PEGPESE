import React from 'react';
import { ScreenContext } from '../../Contexts/ScreenContext';
import { ShopTimelineContext } from '../../Contexts/ShopTimelinecontext';
import { TimelineContext } from '../../Contexts/TimelineContext';
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from './ShopTimelineRegister.module.css'


function ShopTimelineRegister() {
  const timeline = React.useContext(TimelineContext);
  const shopTimeline = React.useContext(ShopTimelineContext);
  const screen = React.useContext(ScreenContext);
  const [idTimeline, setIdTimeline] = React.useState(0);
  const [idShop, setIdShop] = React.useState(0);



  function handleSubmit(e) {
    e.preventDefault();
    // console.log(idTimeline, idShop)
    shopTimeline.postTimelineShop(idTimeline, idShop)
  }

  return (
    <div className={[styles.shoptimelinemenu, "animeLeft"].join(" ")}>
      <h4 className="titleActionPage">Cadastrar / Editar Loja</h4>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.menuSelect}>
          <div className={styles.menuRigth}>
            <p>TimeLine</p>
            <select
              onChange={({ target }) => {
                setIdTimeline(target.value)
              }}
              value={idTimeline}
            >
              <option value='0'>Select</option>
              {timeline.data.map((data, index) => (
                <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
              ))}
            </select>
          </div>
          <div className={styles.MenuLeft}>
            <p>Loja</p>
            <select
              onChange={({ target }) => {
                setIdShop(target.value)
              }}
              value={idShop}
            >
              <option value='0'>Select</option>
              {screen.dataShop.map((data, index) => (
                <option key={index} value={data.id}>{`${data.id} - ${data.description}`}</option>
              ))}
            </select>
          </div>
        </div>
        <Button type="submit">Salvar</Button>
      </form>

      {/* <ImgProvider
        alt="Imagem ilustrativa"
        title=""
        className={styles.providerImg}
      /> */}
    </div>
  )
}


export default ShopTimelineRegister;