import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const showCartMessage = (text) => {
    setMessage(text);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        showCartMessage(`Added another ${product.title}`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showCartMessage(`Added ${product.title} to cart`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (!existingItem) return prevItems;

      if (existingItem.quantity > 1) {
        showCartMessage(`Removed one ${existingItem.title}`);
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        showCartMessage(`Removed ${existingItem.title} from cart`);
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showCartMessage("Cart cleared");
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: itemCount,
        cartTotal: totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}

      {showMessage && (
        <div className="cart-message">
          <div className="message-box">
            <span>🛒</span>
            <span>{message}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
