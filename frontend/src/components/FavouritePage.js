import React, { useEffect, useState } from "react";
import "../styles/Favorites.css";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const FavouritePage = () => {
  const [favourites, setFavourites] = useState([]);
  const [favouriteMeals, setFavouriteMeals] = useState([]);
  const navigate = useNavigate();

  // Fetch user favourites on component mount
  useEffect(() => {
    const fetchFavourites = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("No user token found");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8081/api/auth/favourites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavourites(response.data.favourites);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [navigate]);

  // Fetch meal details for each favourite meal
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const mealDetailsPromises = favourites.map((mealId) =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
          )
        );
        const mealDetailsResponses = await Promise.all(mealDetailsPromises);
        const mealDetails = mealDetailsResponses.map(
          (response) => response.data.meals[0]
        );
        setFavouriteMeals(mealDetails);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    if (favourites.length > 0) {
      fetchMealDetails();
    }
  }, [favourites]);

  // Function to handle removing a favorite
  const handleRemoveFavouriteClick = async (meal) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("No user token found");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/favourites/remove",
        { mealId: meal.idMeal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the favourites state with the response
      setFavourites(response.data.favourites);
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  return (
    <div className="favourites-container">
      {/* <header className="header">
        <img src={logo} alt="coek logo" className="logo" />
        <nav className="nav-links">
          <a href="/home">HOME</a>
          <a href="/favourite" className="active">
            FAVOURITE
          </a>
        </nav>
      </header> */}
      <Header />

      <h2>Your Favourite Meals</h2>
      <div className="meals-container">
        {favouriteMeals.length > 0 ? (
          favouriteMeals.map((meal, index) => (
            <div key={index} className="meal-card">
              <div className="meal-image">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <div className="meal-info">
                <div
                  className="meal-category"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <p className="category-label">{meal.strCategory}</p>
                  <FaHeart
                    className="heart-icon active"
                    onClick={() => handleRemoveFavouriteClick(meal)}
                  />
                </div>
                <h3>{meal.strMeal}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>You have no favourites yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritePage;
