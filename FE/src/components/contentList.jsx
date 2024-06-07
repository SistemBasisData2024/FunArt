// src/components/ContentList.jsx
import React, { useEffect, useState } from 'react';

const ContentList = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/content/getAllSortByDate');
        const data = await response.json();
        if (response.ok) {
          setContents(data);
        } else {
          console.error('Failed to fetch contents:', data.message);
        }
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    fetchContents();
  }, []);

  return (
    <div style={styles.grid}>
      {contents.map((content) => (
        <div key={content.content_id} style={styles.card}>
          <img
            src={`/contents/${content.acc_id}/${content.content_id}.png`}
            alt={content.content_title}
            style={styles.image}
          />
          <h3>{content.content_title}</h3>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};

export default ContentList;