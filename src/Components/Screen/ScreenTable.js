import React from 'react';
import styles from "./ScreenTable.module.css";
import Button from "../Forms/Button";
import { ScreenContext } from "../../Contexts/ScreenContext";
import YesNoModal from "../YesNoModal/YesNoModal";
import {
  ViewList,
  Create,
  Delete,
  ShoppingCart,
} from "@material-ui/icons";
import { MediaContext } from '../../Contexts/MediaContext';
import { ProductContext } from '../../Contexts/ProductContext';
import Product from '../Product/Product';



function ScreenTable({ typeSearch, filterScreen }) {

  const { editScreenProduct, dataDepartment, data, loadScreen, editScreen, deleteScreen } = React.useContext(ScreenContext);
  const [filterData, setFilterData] = React.useState([]);
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
  const [ActionDelete, setActionDelete] = React.useState('');
  const mediaContext = React.useContext(MediaContext);
  const [getSelectMedia, setGetSelectMedia] = React.useState([]);
  const [filemedia, setFilemedia] = React.useState([]);
  // const [getMediaContext, setGetMediaContext] = React.useState([]);
  const { openModal, OpenModalProduct } = React.useContext(ProductContext);
  const [externalIndexDepartment, setExternalIndexDepartment] = React.useState('')

  // const [openEdit, setOpenEdit] = React.useState(false);

  React.useEffect(() => {
    mediaContext.loadMedia();
  }, []);

  React.useEffect(() => {
    setFilemedia(mediaContext.file);
  }, [mediaContext.file]);


  function handleModalProduct(media, department, data) {
    console.log(data)
    editScreenProduct(data)
    for (let a = 0; mediaContext.data.length > a; a++) {
      if (mediaContext.data[a].id === parseInt(media)) {
        mediaContext.loadMediaFile(mediaContext.data[a].id, mediaContext.data[a].type)
      }
    }

    for (let i = 0; dataDepartment.length > i; i++) {
      if (dataDepartment[i].id === parseInt(department)) {
        if (dataDepartment[i].external_index === null) {
          alert('esse departamento não tem index')
        } else {
          setExternalIndexDepartment(parseInt(dataDepartment[i].external_index))
          OpenModalProduct(!openModal)
        }
      }
    }

  }



  React.useEffect(() => {
    for (let i = 0; mediaContext.data.length > i; i++) {
      if (mediaContext.data[i].type == 0) {
        setGetSelectMedia(mediaContext.data[i]);
      }
    }
  }, [mediaContext.data]);

  React.useEffect(() => {
    loadScreen();
  }, []);

  React.useEffect(() => {
    let filter = []
    console.log(typeSearch)
    switch (typeSearch) {
      case 'id':
        filter = data.filter((data) =>
          String(data.id).toLowerCase().includes(filterScreen)
        );
        break;
      case 'description':
        filter = data.filter((data) =>
          data.description.toLowerCase().includes(filterScreen)
        );
        break;
      case 'time':
        filter = data.filter((data) =>
          data.time.toLowerCase().includes(filterScreen)
        );
        break;
      case 'media':
        filter = data.filter((data) =>
          String(data.media_id).toLowerCase().includes(filterScreen)
        );
        break;
      case 'Department':
        filter = data.filter((data) =>
          String(data.department_id).toLowerCase().includes(filterScreen)
        );
        break;
    }
    setFilterData([...filter])
  }, [filterScreen]);


  function handleClick(data) {
    editScreen(data, true)
  }

  function screenDelete(id) {
    setShowYesNoModal(true)
    setActionDelete(id)
    // deleteScreen(id)
  }



  function orderProviders(order) {
    const filter = [...data];
    switch (order) {
      case "id":
        filter.sort();
        break;
      case "description":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "time":
        filter.sort(function (a, b) {
          return a.time.localeCompare(b.time);
        });
        break;
      case "media":
        filter.sort(function (a, b) {
          if (a.media_id > b.media_id)
            return 1;
          if (a.media_id < b.media_id)
            return -1;
          return 0;
        });
        break;
      case "department":
        filter.sort(function (a, b) {
          if (a.department_id > b.department_id)
            return 1;
          if (a.department_id < b.department_id)
            return -1;
          return 0;
        });
        break;
      default:
        return;
    }

    setFilterData(filter)
  }

  return (
    <>
      {openModal && <Product media={filemedia} department={externalIndexDepartment} />}
    <table className={styles.tableStyle}>
      {showYesNoModal && (
        <YesNoModal
        question="Tem certeza que deseja excluir?"
        action={() => deleteScreen(ActionDelete)}
        close={() => {
          setShowYesNoModal(false);
        }}
        />
        )}
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Tempo</th>
          <th>Mídia</th>
          <th>Departamento</th>
          <th>Produto</th>
          <th>Opções</th>
        </tr>
        <tr>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("id")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("description")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("time")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("media")} />
            </span>
          </th>
          <th>
            <span>
              <ViewList className={styles.tableStyleOrder} onClick={() => orderProviders("department")} />
            </span>
          </th>
          <th></th>
          <th></th>

        </tr>
      </thead>

      <tbody>
        {filterData.length > 0 ? filterData.map((data, index) => (
          <tr key={index}>
            <td>{data.id}</td>
            <td>{data.description}</td>
            <td>{data.time}</td>
            <td>{data.media_id}</td>
            <td>{data.department_id}</td>
            {getSelectMedia > 1 ? getSelectMedia.map((id) =>
              data.media_id === id.id ? <td >
                <Button
                  title='Product'
                  type='button'
                  style='btnAttachment'
                  onClick={() => { handleModalProduct(data.media_id, data.department_id, data) }}>
                  <ShoppingCart />
                </Button></td> : <td></td>
            ) : data.media_id === getSelectMedia.id ? <td >
              <Button
                title='Product'
                type='button'
                style='btnAttachment'
                onClick={() => { handleModalProduct(data.media_id, data.department_id, data) }}>
                <ShoppingCart />
              </Button></td> : <td></td>}
            <td>
              <div className={styles.tableStyleButtons}>
                <Button
                  title="Editar"
                  type="button"
                  style="btnEdit"
                  onClick={() => {
                    handleClick(data)
                  }}>
                  <Create />
                </Button>
                <Button title="Excluir" type="button" style="btnDelete" onClick={() => { screenDelete(data.id) }}>
                  <Delete />
                </Button>
              </div>
            </td>
          </tr>
        )) :
          (data.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.description}</td>
              <td>{data.time}</td>
              <td>{data.media_id}</td>
              <td>{data.department_id}</td>
              {getSelectMedia > 1 ? getSelectMedia.map((id) =>
                data.media_id === id.id ?
                  <td >
                    <Button
                      title='Product'
                      type='button'
                      style='btnAttachment'
                      onClick={() => { handleModalProduct(data.media_id, data.department_id, data) }}>
                      <ShoppingCart />
                    </Button>
                  </td>
                  : <td></td>
              ) : data.media_id === getSelectMedia.id ?
                  <td>
                    <Button
                      title='Product'
                      type='button'
                      style='btnAttachment'
                      onClick={() => { handleModalProduct(data.media_id, data.department_id, data) }}>
                      <ShoppingCart />
                    </Button>
                  </td>
                  : <td></td>
              }
              <td>
                <div className={styles.tableStyleButtons}>
                  <Button
                    title="Editar"
                    type="button"
                    style="btnEdit"
                    onClick={() => {
                      handleClick(data)
                    }}>
                    <Create />
                  </Button>
                  <Button title="Excluir" type="button" style="btnDelete" onClick={() => { screenDelete(data.id) }}>
                    <Delete />
                  </Button>
                </div>
              </td>
            </tr>
          )))}
      </tbody>
    </table>
  </>
  )
}


export default ScreenTable;