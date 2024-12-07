import React from "react";
import "../styles/RecipeModal.css";

const RecipeModal = ({ show, onClose, recipe }) => {
  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    // Close modal if the overlay (outside of modal content) is clicked
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{recipe.strMeal}</h2>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="modal-image"
        />
        <div className="modal-scrollable-content">
          <p>
            <strong>Category:</strong> {recipe.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {recipe.strArea}
          </p>
          <p>
            <strong>Instructions:</strong>
          </p>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
