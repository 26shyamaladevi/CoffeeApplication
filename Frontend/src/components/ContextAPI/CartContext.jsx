import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);

  const setCartVisibility = (isVisible) => {
    setIsCartVisible(isVisible);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItemFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };
  const clearCart = () => {
    setCartItems([]);
  };

  // const addOrder = (newOrder) => {
  //   setOrder([...order, newOrder]);
  // };

  const addOrder = (newOrder) => {
    setOrder(newOrder);
  };

  return (
    <CartContext.Provider
      value={{
        isCartVisible,
        toggleCartVisibility,
        setCartVisibility,
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        clearCart,
        addOrder,
        order,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
