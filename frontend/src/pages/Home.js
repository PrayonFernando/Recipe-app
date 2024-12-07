import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import { FaHeart, FaCog } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import RecipeModal from "../components/RecipeModal";
import Header from "../components/Header";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("pork");
  const [meals, setMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories on component mount
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        const categoryNames = response.data.categories.map(
          (category) => category.strCategory
        );
        setCategories(categoryNames.slice(0, 5)); // Limit to 5 categories
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch user favourites after logging in
    const token = localStorage.getItem("userToken");
    if (token) {
      axios
        .get("http://localhost:8081/api/auth/favourites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFavourites(response.data.favourites);
        })
        .catch((error) =>
          console.error("Error fetching user favourites:", error)
        );
    }
  }, []);

  useEffect(() => {
    // Fetch meals by selected category
    if (selectedCategory) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        )
        .then((response) => {
          setMeals(response.data.meals);
        })
        .catch((error) => console.error("Error fetching meals:", error));
    }
  }, [selectedCategory]);

  const handleFavouriteClick = async (meal) => {
    const mealId = meal.idMeal;
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.error("No user token found");
      navigate("/");
      return;
    }

    try {
      if (favourites.includes(mealId)) {
        // Remove from favourites
        const response = await axios.post(
          "http://localhost:8081/api/auth/favourites/remove",
          { mealId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Make sure the format is correct: "Bearer <token>"
            },
          }
        );
        setFavourites(response.data.favourites);
      } else {
        // Add to favourites
        const response = await axios.post(
          "http://localhost:8081/api/auth/favourites/add",
          { mealId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
            },
          }
        );
        setFavourites(response.data.favourites);
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  //---------------------------Reviewing the details of the meals------------------------

  const handleMealClick = (mealId) => {
    // Fetch meal details when a meal is clicked
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        setSelectedRecipe(response.data.meals[0]);
        setShowModal(true);
      })
      .catch((error) => console.error("Error fetching meal details:", error));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleNavigateToFavourites = () => {
    navigate("/favourite");
  };

  const handleLogout = () => {
    // to clear any user session or token
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* <header className="header">
        <img src={logo} alt="coek logo" className="logo" />
        <nav className="nav-links">
          <a href="/home">HOME</a>
          <a href="/favourite">FAVOURITE</a>
          <div className="settings-container">
            <IoExitOutline
              className="settings-icon"
              onClick={() => setShowSettings((prev) => !prev)}
            />
            {showSettings && (
              <div className="settings-dropdown">
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header> */}
      <Header />

      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="meals-container">
        {meals.length > 0 ? (
          meals.map((meal, index) => (
            <div
              key={index}
              className="meal-card"
              onClick={() => handleMealClick(meal.idMeal)}
            >
              <div className="meal-image">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <div className="meal-info">
                <div
                  className="meal-category"
                  style={{ display: "flex", alignItems: "center", gap: "-5px" }}
                >
                  <p className="category-label"> {selectedCategory}</p>
                  <FaHeart
                    className={`heart-icon ${
                      favourites.includes(meal.idMeal) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal opening when clicking the heart
                      handleFavouriteClick(meal);
                    }}
                  />
                </div>
                <div className="meal-name">
                  <h5>{meal.strMeal}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading meals...</p>
        )}
      </div>

      {/* Modal for showing recipe details */}
      {selectedRecipe && (
        <RecipeModal
          show={showModal}
          onClose={closeModal}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
};

export default HomePage;
