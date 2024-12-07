// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./Favorites.css";
// import { FaHeart } from "react-icons/fa";

// const Favourites = () => {
//   const location = useLocation();
//   const favourites = location.state?.favourites || []; // Retrieve favourites from location state

//   return (
//     <div className="favourite-container">
//       <header className="header">
//         <h1 className="logo">coek</h1>
//         <nav className="nav-links">
//           <a href="/home">HOME</a>
//           <a href="/favourites">FAVOURITE</a>
//         </nav>
//       </header>

//       <div className="favourite-meals-container">
//         {favourites.length > 0 ? (
//           favourites.map((meal, index) => (
//             <div key={index} className="meal-card">
//               <div className="meal-image"></div>
//               <div className="meal-info">
//                 <p>Soups</p>
//                 <h3>{meal.strMeal}</h3>
//                 <FaHeart className="heart-icon active" />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No Favourites Selected Yet...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Favourites;
