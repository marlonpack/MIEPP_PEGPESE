import React from "react";
import styles from "./MediaMenu.module.css";
import Input from "../Forms/Input";
import { convertBase64 } from "../../utils/base64";
import { CancelPresentation } from "@material-ui/icons";

const MediaMenu = ({
  handleSubmit,
  description,
  setDescription,
  version,
  setVersion,
  provider,
  setProvider,
  providerContext,
  setImage,
  setVideo,
  image,
  video,
  type,
  setType,
  types,
  setShowFullImage,
  mediaContext,
  editMedia,
  clear,
  setTypes,
}) => {
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

    setType("-1");
    setTypes(options);
  }, [provider]);

  return (
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
            style={styles.mediaMenuFormInputDisabled}
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
                onChange={({ target }) => setProvider(Number(target.value))}
              >
                <option value="0">Selecione</option>
                {providerContext.data.map((provider) => (
                  <option value={provider.id} key={provider.id}>
                    {provider.description}
                  </option>
                ))}
              </select>
            </div>

            {console.log(type)}

            <Input
              onChange={({ target }) => loadFile(target)}
              name="mediaMenuUpload"
              style={styles.mediaMenuUpload}
              id="mediaMenuUpload"
              type="file"
              label="Upload"
              accept={
                +type === 0 || +type === 1 || +type === 3
                  ? "image/png,image/gif, image/jpeg,image/jpg"
                  : +type === 4 || +type === 2
                  ? "video/mp4"
                  : ""
              }
              disabled={+type === -1}
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
  );
};

export default MediaMenu;
