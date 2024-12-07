import React, { createContext, useState, useContext, useEffect } from "react";

// Create a new context
const FavoritesContext = createContext();

// A custom hook to use the FavoritesContext, making it easier to access the favorites state
export const useFavorites = () => useContext(FavoritesContext);

// Create the FavoritesProvider to wrap around components where favorites should be accessible
export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage if it exists
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  // Update localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Function to add a meal to the favorites list
  const addToFavorites = (meal) => {
    if (!favourites.some((fav) => fav.idMeal === meal.idMeal)) {
      setFavourites([...favourites, meal]);
    }
  };

  // Function to remove a meal from the favorites list
  const removeFromFavorites = (mealId) => {
    setFavourites(favourites.filter((fav) => fav.idMeal !== mealId));
  };

  // Function to check if a meal is in the favorites list
  const isFavorite = (mealId) => {
    return favourites.some((fav) => fav.idMeal === mealId);
  };

  // Return the context provider with state and actions available to the entire app
  return (
    <FavoritesContext.Provider
      value={{ favourites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
