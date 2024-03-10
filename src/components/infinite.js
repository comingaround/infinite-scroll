import React, { useState, useEffect, useRef } from 'react';
import "./infinite.css";

const API_KEY = 'b026619d8e53e1b1054ab56daf1f5ec1';

function Infinite() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetchImages();
      }
    }, { threshold: 0.1 });

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, []);

  const fetchImages = () => {
    const tags = 'scifi';
    const perPage = 12;
    const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tags}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1&extras=url_l,url_m,url_s,owner_name`;
  
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const newImages = data.photos.photo.map(photo => ({
          src_l: photo.url_l, // Large-sized image URL
          src_m: photo.url_m, // Medium-sized image URL
          src_s: photo.url_s, // Small-sized image URL
          title: photo.title,
          author: photo.ownername
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(prevPage => prevPage + 1);
        if (data.photos.page >= data.photos.pages) {
          setHasMore(false);
        }
      })
      .catch(error => console.log(error));
  };
  

  return (
    <div className="gallery"> {/* Apply gallery class here */}
    {images.map((img, index) => (
      <div key={index} className="image-item"> {/* Apply image-item class here */}
        <img 
          src={img.src_l} 
          srcSet={`${img.src_s} 1024w, ${img.src_m} 1440w, ${img.src_l} 2048w`} 
          sizes="(max-width: 426px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={img.title}
          loading="lazy"
          data-testid="image-item"
        />
        <div className="credentials">
            <p>Author: {img.author}</p>
            <p>Title: {img.title}</p>
            <div className='favorite'>
              <svg width="24px" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 13.5L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L7.5 13.5ZM1.53553 7.53553L1.18198 7.88909H1.18198L1.53553 7.53553ZM6.53553 2.53553L6.18198 2.88909L6.53553 2.53553ZM7.5 3.5L7.14645 3.85355C7.34171 4.04882 7.65829 4.04882 7.85355 3.85355L7.5 3.5ZM8.46447 2.53553L8.11091 2.18198V2.18198L8.46447 2.53553ZM7.85355 13.1464L1.88909 7.18198L1.18198 7.88909L7.14645 13.8536L7.85355 13.1464ZM13.1109 7.18198L7.14645 13.1464L7.85355 13.8536L13.818 7.88909L13.1109 7.18198ZM6.18198 2.88909L7.14645 3.85355L7.85355 3.14645L6.88909 2.18198L6.18198 2.88909ZM7.85355 3.85355L8.81802 2.88909L8.11091 2.18198L7.14645 3.14645L7.85355 3.85355ZM10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L8.81802 2.88909C9.38729 2.31981 10.1594 2 10.9645 2V1ZM14 5.03553C14 5.84061 13.6802 6.61271 13.1109 7.18198L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553H14ZM15 5.03553C15 2.80677 13.1932 1 10.9645 1V2C12.6409 2 14 3.35905 14 5.03553H15ZM4.03553 2C4.84061 2 5.61271 2.31981 6.18198 2.88909L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1V2ZM1 5.03553C1 3.35905 2.35905 2 4.03553 2V1C1.80677 1 0 2.80677 0 5.03553H1ZM1.88909 7.18198C1.31981 6.61271 1 5.84061 1 5.03553H0C0 6.10582 0.42517 7.13228 1.18198 7.88909L1.88909 7.18198Z" fill="white"/>
              </svg>
              &nbsp;
              <svg width="24px" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.03553 1C1.80677 1 0 2.80677 0 5.03553C0 6.10582 0.42517 7.13228 1.18198 7.88909L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553C15 2.80677 13.1932 1 10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L7.5 2.79289L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1Z" fill="white"/>
              </svg>
            </div>
        </div>
      </div>
    ))}
    {hasMore && <div ref={loader}>
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>}
  </div>
  );
}

export default Infinite;
