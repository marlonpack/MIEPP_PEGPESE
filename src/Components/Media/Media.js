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
} from "@material-ui/icons";
import ImageModal from "../ImageModal/ImageModal";

const Media = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [showFullImage, setShowFullImage] = React.useState(false);

  async function loadFile(e) {
    const file = e.files[0];

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

  return (
    <div className={styles.containerMedia}>
      {showFullImage && <ImageModal src={image} close={() => setShowFullImage(false)}/>}

      <div className={styles.topMedia}>
        <div className={styles.topMediaLeft}>
          <Button
            type="button"
            style="btnAdd"
            onClick={() => (setShowMenu(!showMenu),setImage(null),setVideo(null))}
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

            <form action="">
              <div className={styles.mediaMenuFormTop}>
                <Input
                  style={styles.mediaMenuFormInput}
                  label="Descrição"
                  type="text"
                  name="description"
                />

                <Input
                  style={styles.mediaMenuFormInput}
                  label="Versão"
                  type="text"
                  name="version"
                />
              </div>

              <div className={styles.mediaMenuFormMiddle}>
                <div className={styles.mediaMenuLeft}>
                  <p>Fornecedor</p>
                  <select>
                    <option>Select</option>
                    <option>1 - Peg Pese</option>
                    <option>2 - Frugal</option>
                  </select>

                  <Input
                    onChange={({ target }) => loadFile(target)}
                    name="mediaMenuUpload"
                    style={styles.mediaMenuUpload}
                    type="file"
                    label="Upload"
                  />
                </div>

                <div className={styles.mediaMenuRight}>
                  <p>Tipo</p>
                  <select>
                    <option>Select</option>
                    <option>0 - Lista de produtos</option>
                    <option>1 - Video</option>
                    <option>2 - Imagem</option>
                  </select>

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
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>BG Test</td>
                <td>Peg Pese</td>
                <td>Lista de Produtos</td>
                <td>1</td>
                <td>
                  <Button
                    style="btnAttachment"
                    title="Visualizar"
                    type="button"
                  >
                    <Attachment />
                  </Button>
                </td>
                <td>
                  <div className={styles.tableStyleButtons}>
                    <Button title="Editar" type="button" style="btnEdit">
                      <Create />
                    </Button>
                    <Button title="Excluir" type="button" style="btnDelete">
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>BG Test</td>
                <td>Peg Pese</td>
                <td>Lista de Produtos</td>
                <td>1</td>
                <td>
                  <Button
                    style="btnAttachment"
                    title="Visualizar"
                    type="button"
                  >
                    <Attachment />
                  </Button>
                </td>
                <td>
                  <div className={styles.tableStyleButtons}>
                    <Button title="Editar" type="button" style="btnEdit">
                      <Create />
                    </Button>
                    <Button title="Excluir" type="button" style="btnDelete">
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Media;
