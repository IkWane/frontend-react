import { createContext, useContext, useState } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (book) => {
        setFavorites((prevFav) => [...prevFav, book]);
    };

    const removeFavorite = (book) => {
        setFavorites(favorites.filter((fav) => fav !== book));
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export function useFavoriteContext() {
    return useContext(FavoriteContext);
}