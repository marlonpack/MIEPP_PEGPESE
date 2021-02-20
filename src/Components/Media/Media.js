import React from "react";
import styles from "./Media.module.css";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { convertBase64 } from "../../utils/base64";
import {
  AddBox,
  Search,
  ViewList,
  Create,
  Delete,
  Attachment,
  CancelPresentation,
} from "@material-ui/icons";
import ImageModal from "../ImageModal/ImageModal";
import YesNoModal from "../YesNoModal/YesNoModal";
import { MediaContext } from "../../Contexts/MediaContext";
import { ProviderContext } from "../../Contexts/ProviderContext";
import { NotificationStore } from "../Notification/StoreNotification";

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

  async function loadFile(e) {
    const file = e.files[0];
    if (file) {
      if (file.type.includes("image")) {
        const base = await convertBase64(file);
        setImage(base);
        setVideo(null);
        return;
      }

      if (file.type.includes("video")) {
        const base = await convertBase64(file);
        setVideo(base);
        setImage(null);
        return;
      }
    }
  }

  function getFile(id, type) {
    mediaContext.loadMediaFile(id, type);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let media = image !== null ? image : video !== null ? video : null;

    if (media) {
      // Send only base64
      media = media.split(",");

      if (editMedia) {
        mediaContext.updateMedia(
          editMedia.id,
          description,
          type,
          media[1],
          provider
        );
      } else {
        mediaContext.createMedia(description, type, media[1], provider);
      }

      if (mediaContext.error === null) {
        clear();
      }
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

  return (
    <div className={styles.containerMedia}>
      {mediaContext.error &&
        NotificationStore(mediaContext.error, "teste", "danger")}

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
      <div className={styles.topMedia}>
        <div className={styles.topMediaLeft}>
          <Button
            type="button"
            style="btnAdd"
            onClick={() => (setShowMenu(!showMenu), clear())}
          >
            <AddBox />
          </Button>

          <h3 className="titleSection">Lista de Mídias</h3>
        </div>
        <div className={styles.topMediaRight}>
          <Input
            style={styles.topMediaForm}
            label="Pesquisar"
            type="text"
            id="searchProvider"
            name="searchProvider"
          />
          <Button type="button" style="btnSearch">
            <Search />
          </Button>
        </div>
      </div>

      <div className={styles.mainMedia}>
        {showMenu && (
          <div className={[styles.mediaMenu, "animeLeft"].join(" ")}>
            <h4 className="titleActionPage">Cadastrar / Editar Mídias</h4>

            <form action="" onSubmit={handleSubmit}>
              <div className={styles.mediaMenuFormTop}>
                <Input
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  style={styles.mediaMenuFormInput}
                  label="Descrição"
                  type="text"
                  name="description"
                />

                <Input
                  value={version}
                  onChange={({ target }) => setVersion(target.value)}
                  style={styles.mediaMenuFormInput}
                  label="Versão"
                  type="text"
                  name="version"
                  disabled={true}
                />
              </div>

              <div className={styles.mediaMenuFormMiddle}>
                <div className={styles.mediaMenuLeft}>
                  <div>
                    <p>Fornecedor</p>
                    <select
                      value={provider}
                      onChange={({ target }) =>
                        setProvider(Number(target.value))
                      }
                    >
                      <option value="0">Selecione</option>
                      {providerContext.data.map((provider) => (
                        <option value={provider.id} key={provider.id}>
                          {provider.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    onChange={({ target }) => loadFile(target)}
                    name="mediaMenuUpload"
                    style={styles.mediaMenuUpload}
                    id="mediaMenuUpload"
                    type="file"
                    label="Upload"
                    accept="video/mp4,image/png,image/gif, image/jpeg,image/jpg"
                  />
                </div>

                <div className={styles.mediaMenuRight}>
                  <div>
                    <p>Tipo</p>
                    <select
                      value={type}
                      onChange={({ target }) => setType(target.value)}
                    >
                      <option value="">Selecione</option>
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit">Enviar</button>
                </div>
              </div>
            </form>

            <div className={styles.mediaMenuBottom}>
              {video && (
                <video
                  src={video}
                  className={styles.mediaMenuBottomVideo}
                  autoPlay={true}
                  controls
                ></video>
              )}

              {image && (
                <img
                  src={image}
                  className={styles.mediaMenuBottomImage}
                  alt="Imagem anexada"
                  onClick={() => setShowFullImage(true)}
                ></img>
              )}

              {(video || image) && (
                <span
                  title="Remover anexo"
                  className={styles.mediaMenuBottomRemove}
                  onClick={() => (
                    setVideo(null),
                    setImage(null),
                    (document.getElementById("mediaMenuUpload").value = "")
                  )}
                >
                  <CancelPresentation />
                </span>
              )}
            </div>
          </div>
        )}
        <div
          className={styles.tableArea}
          style={showMenu ? { width: "60%" } : {}}
        >
          <table className={styles.tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Fornecedor</th>
                <th>Tipo</th>
                <th>Versão</th>
                <th>Arquivo</th>
                <th>Opções</th>
              </tr>

              <tr>
                <th>
                  <span>
                    <ViewList className={styles.tableStyleOrder} />
                  </span>
                </th>
                <th>
                  <span>
                    <ViewList className={styles.tableStyleOrder} />
                  </span>
                </th>
                <th>
                  <span>
                    <ViewList className={styles.tableStyleOrder} />
                  </span>
                </th>
                <th>
                  <span>
                    <ViewList className={styles.tableStyleOrder} />
                  </span>
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {mediaContext.data.map((media) => (
                <tr key={media.id}>
                  <td>{media.id}</td>
                  <td>{media.description}</td>
                  {providerContext.data.map(
                    (provider) =>
                      provider.id === media.supplier_id && (
                        <td key={provider.id}>{provider.description}</td>
                      )
                  )}
                  <td>{media.type}</td>
                  <td>{media.file_version}</td>
                  <td>
                    <Button
                      style="btnAttachment"
                      title="Visualizar"
                      type="button"
                      onClick={() => getFile(media.id, media.type)}
                    >
                      <Attachment />
                    </Button>
                  </td>
                  <td>
                    <div className={styles.tableStyleButtons}>
                      <Button
                        title="Editar"
                        type="button"
                        style="btnEdit"
                        onClick={() => (setEditMedia(media), setShowMenu(true))}
                      >
                        <Create />
                      </Button>
                      <Button
                        title="Excluir"
                        type="button"
                        style="btnDelete"
                        onClick={() => (
                          setDelMedia(media.id), setShowYesNoModal(true)
                        )}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Media;
