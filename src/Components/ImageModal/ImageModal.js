import React from 'react';
import styles from './ImageModal.module.css';
import useOutsideClick from '../../Hooks/useOutsideClick';

const ImageModal = ({ src, close }) => {
  let domNode = useOutsideClick(() => {
    close();
  });

  return (
    <div className={styles.containerImageModal}>
      <div className={styles.modalImageModal}>
        <img ref={domNode} src={src} alt="" />
      </div>
    </div>
  );
};

export default ImageModal;
