// src/components/contentList.jsx
import React, { useEffect, useState } from 'react';
import ContentItem from './contentItem';

const ContentList = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Fetch content data from your backend API
    fetch('/api/content/getAllSortByDate')
      .then((response) => response.json())
      .then((data) => setContents(data))
      .catch((error) => console.error('Error fetching content:', error));
  }, []);

  return (
    <div style={styles.contentList}>
      {contents.map((content) => (
        <ContentItem key={content.content_id} content={content} />
      ))}
    </div>
  );
};

const styles = {
  contentList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px',
  },
};

export default ContentList;
