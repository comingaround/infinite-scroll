import React, { useState, useEffect, useRef } from 'react';
import "./infinite.css";

const API_KEY = 'b026619d8e53e1b1054ab56daf1f5ec1';


function Infinite() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const loader = useRef(null);

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

  const fetchImages = () => {
    if (isFetching) return;

    setIsFetching(true); 
    const tags = 'scifi';
    const perPage = 12;
    const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tags}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1&extras=url_l,url_m,url_s,owner_name&sort=interestingness-desc`;

    console.log(page);
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const newImages = data.photos.photo.map(photo => ({
          src_l: photo.url_l,
          src_m: photo.url_m,
          src_s: photo.url_s,
          title: photo.title,
          author: photo.ownername
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(prevPage => prevPage + 1);
        if (data.photos.page >= data.photos.pages) {
          setHasMore(false);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setIsFetching(false));
  };
  const saveImageUrlToLocal = (url) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];
    if (!favorites.includes(url)) {
      favorites.push(url);
      localStorage.setItem('favoriteImages', JSON.stringify(favorites));
    }
    console.log(url);
  };

  return (
    <div className="gallery">
    {images.map((img, index) => (
      <div key={index} className="image-item">
        <img 
          src={img.src_l} 
          srcSet={`${img.src_s} 426w, ${img.src_m} 1024w, ${img.src_l} 1440w`} 
          sizes="(max-width: 426px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={img.title}
          loading="lazy"
          data-testid="image-item"
        />
        <div className="credentials">
            <span />
            <section>
              <h1>{img.title}</h1>
              <h3>{img.author}</h3>
            </section>
            <div className='favorite'>
              <button onClick={() => saveImageUrlToLocal(img.src_l)}>Add to Favorite</button>
              <button>Favorite</button>
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
