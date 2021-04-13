import React from 'react';
import styles from './VideoModal.module.css';
import useOutsideClick from '../../Hooks/useOutsideClick';

const VideoModal = ({ src, close }) => {
  let domNode = useOutsideClick(() => {
    close();
  });

  return (
    <div className={styles.containerVideoModal}>
      <div className={styles.modalVideoModal}>
        <video ref={domNode} src={src} alt="" autoPlay controls />
      </div>
    </div>
  );
};

export default VideoModal;
