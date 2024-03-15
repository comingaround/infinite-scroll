import React, { useState, useEffect, useRef } from 'react';
import "./infinite.css";

const API_KEY = 'b026619d8e53e1b1054ab56daf1f5ec1';

function Infinite() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const loader = useRef(null);

  // loader
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting && !isFetching) {
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
  }, [page, isFetching]);

  // fetching
  const fetchImages = () => {
    if (isFetching) return;
  
    setIsFetching(true); 
    const tags = 'scifi-art';
    const perPage = 12;
    const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tags}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1&extras=url_s,url_m,url_l,url_o,url,width_s,height_s,width_m,height_m,width_l,height_l,width_o,height_o,owner_name&sort=interestingness_desc`;
  
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const newImages = data.photos.photo.map(photo => {
          console.log(`Image dimensions - Small: ${photo.width_s}x${photo.height_s}, Medium: ${photo.width_m}x${photo.height_m}, Large: ${photo.width_l}x${photo.height_l}, Default: ${photo.width_o}x${photo.height_o}, Title ${photo.title}`);
          return {
            src_s: photo.url_s,
            width_s: photo.width_s,
            height_s: photo.height_s,
            src_m: photo.url_m,
            width_m: photo.width_m,
            height_m: photo.height_m,
            src_l: photo.url_l,
            width_l: photo.width_l,
            height_l: photo.height_l,
            src_o: photo.url_o,
            width_o: photo.width_o,
            height_o: photo.height_o,
            title: photo.title.length > 50 ? photo.title.substring(0, 50) + '...' : photo.title,
            author: photo.ownername,
          };
        });
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(prevPage => prevPage + 1);
        console.log(page);
        if (data.photos.page >= data.photos.pages) {
          setHasMore(false);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setIsFetching(false));
  };
  
  // favorites
  useEffect(() => {
    const loadedFavorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];
    const initialFavorites = loadedFavorites.reduce((acc, url) => {
      acc[url] = true;
      return acc;
    }, {});
    setFavorites(initialFavorites);
  }, []);

  const toggleFavoriteStatus = (imgSrc) => {
    let savedImages = JSON.parse(localStorage.getItem('favoriteImages')) || [];
    const isFavorite = savedImages.includes(imgSrc);
    if (isFavorite) {
      savedImages = savedImages.filter(src => src !== imgSrc);
    } else {
      savedImages.push(imgSrc);
    }
    localStorage.setItem('favoriteImages', JSON.stringify(savedImages));
    setFavorites(prev => {
      if (isFavorite) {
        const updatedFavorites = { ...prev };
        delete updatedFavorites[imgSrc];
        return updatedFavorites;
      } else {
        return { ...prev, [imgSrc]: true };
      }
    });
  };

  // "hover" for small screens
  const isTouchDevice = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
  };
  const handleImageClick = (index) => {
      if (isTouchDevice()) {
          setActiveItem(activeItem === index ? null : index);
      }
  };
  
  
  return (
    <div className="gallery" data-testid="image-array">
      {images.map((img, index) => {
        const imageUrl = img.src_l || img.src_o || img.src_m || img.src_s;
  
        return (
          <div key={index} 
            className={`image-item ${activeItem === index ? 'is-active' : 'not-active'}`} 
            onClick={() => handleImageClick(index)}
            data-testid="image-item"
          >
            <img 
              src={img.src_l || img.src_o}
              srcSet={`
                ${img.src_s} 526w, 
                ${img.src_m} 1024w
                ${img.src_l ? `, ${img.src_l} 2048w` : img.src_o ? `, ${img.src_o} 2048w` : ''}
              `} 
              sizes="(max-width: 526px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={img.title}
              loading="lazy"
              data-testid="image"
            />
            <div className="credentials">
              <span />
              <section>
                <h1 onClick={() => {
                  if (imageUrl) {
                    window.open(imageUrl, '_blank');
                  }
                }}>{img.title}</h1>
                <h3>{img.author}</h3>
              </section>
              <div className='favorite'>
                {!favorites[img.src_l || img.src_o || img.src_m || img.src_s] ? (
                  <button onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteStatus(imageUrl);
                  }}>Add to Favorites</button>
                ) : (
                  <button onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteStatus(imageUrl);
                  }}>Favorites</button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {hasMore && <div ref={loader} data-testid="observer">
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


