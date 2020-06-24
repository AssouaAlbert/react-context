import React, {useContext} from 'react';

import CartContext from '../../contexts/cart/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({  itemCount }) =>{
  const {toggleHidden} = useContext(CartContext);

  return (  <div className='cart-icon' onClick={toggleHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>)
}

export default CartIcon;
