import React from "react";
import styles from "./Header.module.css";
import mealImage from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";

function Header({onCartClick}) {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton showCartHandler={onCartClick}/>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImage} alt="Meal" />
      </div>
    </>
  );
}

export default Header;
