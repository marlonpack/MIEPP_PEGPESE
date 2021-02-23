import React from "react";
import styles from './ProviderMenu.module.css';
import { ReactComponent as ImgProvider } from "../../Assets/provider.svg";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

const ProviderMenu = ({handleSubmit,provider,setProvider}) => {
  return (
    <div className={[styles.providerMenu, "animeLeft"].join(" ")}>
      <h4 className="titleActionPage">Cadastrar / Editar Fornecedor</h4>
      <form action="" onSubmit={handleSubmit}>
        <Input
          style={styles.providerMenuForm}
          label="Nome: "
          type="text"
          id="providerName"
          name="providerName"
          value={provider}
          onChange={({ target }) => setProvider(target.value)}
        />

        <Button type="submit">Salvar</Button>
      </form>

      <ImgProvider
        alt="Imagem ilustrativa"
        title=""
        className={styles.providerImg}
      />
    </div>
  );
};

export default ProviderMenu;
