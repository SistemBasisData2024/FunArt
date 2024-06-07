// src/components/ImageViewer.jsx
import React from 'react';

const ImageViewer = ({ imageUrl, onClose }) => {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.imageContainer}>
        <img src={imageUrl} alt="Full size" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
};

export default ImageViewer;
