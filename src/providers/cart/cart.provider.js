import React, {createContext, useState, useEffect} from 'react';

import {addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, totalItemsAmount} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    cartItemsCount: 0,
    clearItem: () => {},
    total: 0,
});

const CartProvider = ({children}) => {
    const [hidden, setHiddem] = useState(true);
    const [total, setTotal] = useState(0)
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const toggleHidden = () => setHiddem(!hidden);
    const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item));
    const clearItem = (item) => setCartItems(filterItemFromCart(cartItems,item));
    useEffect (() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setTotal(totalItemsAmount(cartItems));

    }, [cartItems]);
    return (
    <CartContext.Provider
        value={{
            hidden,
            cartItems,
            cartItemsCount,
            addItem,
            toggleHidden,
            removeItem,
            clearItem,
            total
        }}
    >
        ({children})
    </CartContext.Provider>
    )
}

export default CartProvider;