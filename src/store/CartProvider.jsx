import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if(action.type === "ADD"){
    let updatedItems
    const index = state.items.findIndex(item => item.id === action.item.id)
    if(index >= 0){
      const foundItem = state.items[index]
      const updatedItem = {...foundItem, amount: foundItem.amount + action.item.amount}
      updatedItems = state.items.map((item, i) => i === index ? updatedItem : item)
    } else {
      updatedItems = [...state.items, action.item]
    }

    const updatedAmount = state.totalAmount + action.item.price * action.item.amount

    return {items: updatedItems, totalAmount: updatedAmount}
  }
  if(action.type === "REMOVE"){
    let updatedItems
    const selectedItem = state.items.find(item => item.id === action.id)
    if(selectedItem.amount > 1){
      const updatedItem = {...selectedItem, amount: selectedItem.amount - 1}
      updatedItems = state.items.map(item => item.id !== action.id ? item : updatedItem)
    } else {
      updatedItems = state.items.filter(item => item.id !== action.id)
    }

    const updatedAmount = state.totalAmount - selectedItem.price

    return {items: updatedItems, totalAmount: updatedAmount}
  }
  if(action.type === "CLEAR"){
    return {items: [], totalAmount: 0}
  }
  
  return state
};


function CartProvider(props) {

  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({type: "ADD", item: item})
  };

  const removeItemFromCart = (id) => {
    dispatch({type: "REMOVE", id: id})
  };

  const clearCart = () => {
    dispatch({type: "CLEAR"})
  }

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCart
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
