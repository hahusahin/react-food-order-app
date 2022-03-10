import React, {useContext} from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem({ meal, id }) {

  const cartCtx = useContext(CartContext)

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: meal.name,
      price: meal.price,
      amount: amount
    })
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{`$${meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
}

export default MealItem;
