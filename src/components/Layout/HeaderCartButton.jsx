import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton({ showCartHandler }) {
  const { items } = useContext(CartContext);
  const [isBtnBumped, setIsBtnBumped] = useState(false)

  const numOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnStyles = `${styles.button} ${isBtnBumped ? styles.bump : ""}`

  useEffect(() => {
    if(items.length === 0){
      return
    }
    setIsBtnBumped(true)    
    
    const timer = setTimeout(() => {
      setIsBtnBumped(false)
    }, 300);

    return () => {
      clearTimeout(timer)  
    }
  }, [items])
  

  return (
    <button className={btnStyles} onClick={showCartHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
