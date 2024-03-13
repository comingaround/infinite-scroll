import React, { useState, useEffect } from 'react';
import "./favorites.css";
import ToTop from "../toTop/toTop";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // Function to fetch favorites from local storage
    const fetchFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];
        setFavorites(savedFavorites);
    };

    // Toggle visibility and fetch favorites
    const toggleFavoritesVisibility = () => {
        setIsVisible(!isVisible);
        fetchFavorites(); // Re-fetch favorites each time visibility changes
    };

    // Initial fetch of favorites on component mount
    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <>
            <div className="favorites">
                <div className={isVisible ? "favorites_on" : ""} onClick={toggleFavoritesVisibility}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                </div>
                <ToTop />
            </div>
            <div className="favorites_array" style={{display: isVisible ? 'flex' : 'none'}}>
                {favorites.map((imgSrc, index) => (
                    <div className="favorites_list" key={index}>
                        <img src={imgSrc} alt={`Favorite ${index}`} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Favorites;
