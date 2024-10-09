import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/global.css'; // Add appropriate carousel styles here

const Carousel = ({ accessToken }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (accessToken) {
      axios.get('https://open.tiktokapis.com/v2/video/list/?fields=embed_html', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        setVideos(response.data.data.videos);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
    }
  }, [accessToken]);

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {videos.map((video, index) => (
          <div className="carousel-item" key={index} dangerouslySetInnerHTML={{ __html: video.embed_html }} />
        ))}
      </div>
      <button className="prev">‹</button>
      <button className="next">›</button>
    </div>
  );
};

export default Carousel;
