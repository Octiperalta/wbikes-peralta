import React, { useState, createContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (newItem, newQuantity) => {
    const currentItem = isInCart(newItem.productID);
    if (currentItem) {
      // const newCart = cart.filter(c => c.productID !== currentItem.productID);
      // setCart([...newCart, {item: currentItem, quantity: item.quantity + newQuantity }])
      currentItem.quantity += newQuantity;
      setCart(cart);
    } else {
      setCart([...cart, { item: newItem, quantity: newQuantity }]);
    }
  };

  const cartTotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.item.productPrice * item.quantity,
      0
    );
  };

  const isInCart = id => {
    return cart.find(e => e.item.productID === id);
  };

  const removeItem = itemID => {
    const newCart = cart.filter(e => e.item.productID !== itemID);
    console.log(newCart);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const data = { cart, addItem, removeItem, clearCart, cartTotal };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}

export default CartContext;
