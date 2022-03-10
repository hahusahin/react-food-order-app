import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartVisible, setIsCardVisible] = useState(false);

  const showCartHandler = () => {
    setIsCardVisible(true);
  };

  const hideCartHandler = () => {
    setIsCardVisible(false);
  };

  return (
    <CartProvider>
      {isCartVisible && <Cart onCloseClick={hideCartHandler} />}
      <Header onCartClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
