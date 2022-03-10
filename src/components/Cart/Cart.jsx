import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart({ onCloseClick }) {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const cartCtx = useContext(CartContext);

  const hasItem = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onOrderHandler = () => {
    setIsCheckOut(true);
  };

  const onConfirmHandler = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_ORDERS_URL,
        {
          method: "POST",
          body: JSON.stringify({ orderedItems: cartCtx.items, user: userData }),
        }
      );
      if (!response.ok) {
        throw new Error("Something unexpected occured!\nPlease try again later");
      }
      setError(null);
      setIsLoading(false);
      setIsSubmitted(true);
      cartCtx.clearCart();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  return (
    <Modal onBackdropClick={onCloseClick}>
      {!isLoading && !error && !isSubmitted && (
        <React.Fragment>
          <ul className={styles["cart-items"]}>{cartItems}</ul>
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
          </div>
          {isCheckOut && (
            <Checkout onConfirm={onConfirmHandler} onCancel={onCloseClick} />
          )}
          {!isCheckOut && (
            <div className={styles.actions}>
              <button className={styles["button--alt"]} onClick={onCloseClick}>
                Close
              </button>
              {hasItem && (
                <button className={styles.button} onClick={onOrderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </React.Fragment>
      )}
      {isLoading && <p>Processing Your Order. Please Wait...</p>}
      {error && (
        <React.Fragment>
          <p>{error}</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={onCloseClick}>
              Close
            </button>
          </div>
        </React.Fragment>
      )}
      {isSubmitted && !isLoading && !error && (
        <React.Fragment>
          <p>Successfully Sent the Order</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={onCloseClick}>
              Close
            </button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default Cart;
