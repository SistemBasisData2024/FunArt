// src/components/ContentItem.jsx
import React from 'react';

const ContentItem = ({ content }) => {
  return (
    <div style={styles.ContentItem}>
      <img src={content.image} alt={content.title} style={styles.image} />
      <div style={styles.title}>{content.title}</div>
    </div>
  );
};

const styles = {
  contentItem: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '10px',
    width: 'calc(25% - 20px)',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  title: {
    padding: '10px',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default ContentItem;