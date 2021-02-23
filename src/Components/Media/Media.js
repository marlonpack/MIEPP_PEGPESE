import React from "react";
import styles from "./Media.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { AddBox, Search } from "@material-ui/icons";
import ImageModal from "../ImageModal/ImageModal";
import YesNoModal from "../YesNoModal/YesNoModal";
import { MediaContext } from "../../Contexts/MediaContext";
import { ProviderContext } from "../../Contexts/ProviderContext";
import NotificationError from "../Notification/NotificationError";
import MediaTable from "./MediaTable";
import MediaMenu from "./MediaMenu";

const Media = () => {
  const mediaContext = React.useContext(MediaContext);
  const providerContext = React.useContext(ProviderContext);
  const [showYesNoModal, setShowYesNoModal] = React.useState(false);
  const [delMedia, setDelMedia] = React.useState(null);
  const [showMenu, setShowMenu] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [showFullImage, setShowFullImage] = React.useState(false);
  const [provider, setProvider] = React.useState(0);
  const [type, setType] = React.useState("");
  const [types, setTypes] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [version, setVersion] = React.useState("");
  const [editMedia, setEditMedia] = React.useState(null);
  const [filterData, setFilterData] = React.useState([]);
  const [typeSearch, setTypeSearch] = React.useState("");

  React.useEffect(() => {
    if (typeSearch === "") {
      setFilterData([]);
      document.getElementById("searchMedia").value = "";
    }
  }, [typeSearch]);

  React.useEffect(() => {
    if (mediaContext.data) {
      let suppliers = [];
      mediaContext.data.map((supplier) => suppliers.push(supplier.supplier_id));
      suppliers = [...new Set(suppliers)];
      suppliers.map((supplier) => providerContext.loadProvider(supplier));
    }
  }, [mediaContext.data]);

  React.useEffect(() => {
    let options = [];

    if (+provider !== 0) {
      options = [
        { id: 3, description: "Imagem" },
        { id: 4, description: "Video" },
      ];
    }

    if (+provider === 1) {
      options = [
        { id: 0, description: "Produtos" },
        { id: 1, description: "Imagem" },
        { id: 2, description: "Video" },
      ];
    }

    setTypes(options);
  }, [provider]);

  React.useEffect(() => {
    if (mediaContext.file) {
      if (
        mediaContext.file.type === 3 ||
        mediaContext.file.type === 1 ||
        mediaContext.file.type === 0
      ) {
        setVideo(null);
        setImage(mediaContext.file.file);
      }

      if (mediaContext.file.type === 4 || mediaContext.file.type === 2) {
        setImage(null);
        setVideo(mediaContext.file.file);
      }
    }
  }, [mediaContext.file]);

  React.useEffect(() => {
    mediaContext.loadMedia();
  }, []);

  React.useEffect(() => {
    if (editMedia !== null) {
      setTimeout(() => {
        setDescription(editMedia.description);
        setVersion(editMedia.file_version);
        setProvider(editMedia.supplier_id);
        setType(editMedia.type);
        getFile(editMedia.id, editMedia.type);
      }, 1000);
    }
  }, [editMedia]);

  function getFile(id, type) {
    mediaContext.loadMediaFile(id, type);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let media = image !== null ? image : video !== null ? video : null;

    // Send only base64
    media = media ? media.split(",") : [null];

    let response;

    if (editMedia) {
      response = await mediaContext.updateMedia(
        editMedia.id,
        description,
        type,
        media[1],
        provider
      );
    } else {
      response = await mediaContext.createMedia(
        description,
        type,
        media[1],
        provider
      );
    }

    if (response) {
      clear();
    }
  }

  function clear() {
    setDescription("");
    setVersion("");
    setProvider(0);
    setType("");
    setVideo(null);
    setImage(null);
  }

  function searchMedia(search) {
    if (typeSearch === "") {
      setFilterData([]);
      return;
    }

    let filter = [];

    const proName = search.toLowerCase();

    switch (typeSearch) {
      case "description":
        filter = mediaContext.data.filter((media) =>
          media.description.toLowerCase().includes(proName)
        );
        break;

      case "id":
        filter = mediaContext.data.filter((media) =>
          String(media.id).includes(search)
        );
        break;
      case "provider":
        if (search === "") {
          break;
        }

        const providerFilter = providerContext.provider.filter((provider) =>
          provider.description.toLowerCase().includes(proName)
        );

        if (providerFilter.length > 0) {
          filter = mediaContext.data.filter(
            (media) => media.supplier_id === providerFilter[0].id
          );
        }
        break;
      case "type":
        if (search === "") {
          break;
        }
        filter = mediaContext.data.filter((media) => +media.type === +search);
        break;
      case "file_version":
        if (search === "") {
          break;
        }
        filter = mediaContext.data.filter(
          (media) => +media.file_version === +search
        );
        break;
    }

    setFilterData(filter ? [...filter] : []);
  }

  function orderMedia(order) {
    const filter = [...mediaContext.data];
    switch (order) {
      case "id":
        filter.sort();
        break;
      case "description":
        filter.sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
        break;
      case "provider":
        filter.sort(function (a, b) {
          return a.supplier_id > b.supplier_id;
        });
        break;
      case "type":
        filter.sort(function (a, b) {
          return a.type > b.type;
        });
        break;
      default:
        return;
    }

    setFilterData(filter);
  }

  return (
    <div className={styles.containerMedia}>
      {showFullImage && (
        <ImageModal src={image} close={() => setShowFullImage(false)} />
      )}

      {showYesNoModal && (
        <YesNoModal
          question="Tem certeza que deseja excluir?"
          close={() => (setShowYesNoModal(false), setDelMedia(null))}
          action={() => mediaContext.deleteMedia(delMedia)}
        />
      )}

      {mediaContext.error !== null && NotificationError(mediaContext.error)}
      <div className={styles.topMedia}>
        <div className={styles.topMediaLeft}>
          <Button
            type="button"
            style="btnAdd"
            onClick={() => (setShowMenu(!showMenu), clear())}
          >
            <AddBox />
          </Button>

          {mediaContext.error !== null && (
            <h1 color="#fff" style={{ fontSize: "28px" }}>
              Teste Error
            </h1>
          )}

          <h3 className="titleSection">Lista de Mídias</h3>
        </div>
        <div className={styles.topMediaRight}>
          <select
            value={typeSearch}
            onChange={({ target }) => setTypeSearch(target.value)}
          >
            <option value="">Selecione</option>
            <option value="description">Descrição</option>
            <option value="id">ID</option>
            <option value="provider">Fornecedor</option>
            <option value="type">Tipo</option>
            <option value="file_version">Versão</option>
          </select>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar"
            type="text"
            id="searchMedia"
            name="searchMedia"
            onChange={({ target }) => searchMedia(target.value)}
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>

      <div className={styles.mainMedia}>
        {showMenu && (
          <MediaMenu
            handleSubmit={handleSubmit}
            description={description}
            setDescription={setDescription}
            version={version}
            setVersion={setVersion}
            provider={provider}
            setProvider={setProvider}
            providerContext={providerContext}
            image={image}
            setImage={setImage}
            video={video}
            setVideo={setVideo}
            type={type}
            setType={setType}
            types={types}
            setShowFullImage={setShowFullImage}
          />
        )}
        <MediaTable
          mediaContext={mediaContext}
          providerContext={providerContext}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setEditMedia={setEditMedia}
          setDelMedia={setDelMedia}
          setShowYesNoModal={setShowYesNoModal}
          filterData={filterData}
          orderMedia={orderMedia}
        />
      </div>
    </div>
  );
};

export default Media;
