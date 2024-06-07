import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ContentDetail = () => {
    const { id } = useParams();
    const [content, setContent] = useState(null);

    const history = useHistory();
    const handleImageClick = () => {
      history.push(`/content/${content.content_id}/view`);
    };
  
    useEffect(() => {
      const fetchContent = async () => {
        try {
          const response = await fetch(`/api/content/${id}`);
          const data = await response.json();
          if (response.ok) {
            setContent(data);
          } else {
            console.error('Failed to fetch content:', data.message);
          }
        } catch (error) {
          console.error('Error fetching content:', error);
        }
      };
  
      fetchContent();
    }, [id]);
  
    if (!content) {
      return <div>Loading...</div>;
    }
    
  
    return (
      <div>
        <img src={`/contents/${content.acc_id}/${content.content_id}.png`} 
                    alt={content.content_title}
                    onClick={handleImageClick} />
        <h2>{content.content_title}</h2>
        {/* Display other information about the content */}
      </div>
    );
  };

export default ContentDetail;
