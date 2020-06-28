import React,{useContext, useState} from 'react';
import { Link } from 'react-router-dom';


import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CurrentUser from '../../contexts/current-user/current-user.context';
import {CartContext} from '../../providers/cart/cart.provider';

import { ReactComponent as Logo } from '../../assets/crown.svg';

// import './header.style.scss';
import {HeaderContainer, OptionLinkContainer, OptionSpanContainer,OptionsContainer, LogoContainter} from './header.styles';

const Header = () => {
  const currentUser = useContext(CurrentUser);
  const {hidden} = useContext(CartContext);
  return (
  <HeaderContainer>
    <LogoContainter to='/'><Logo className='logo'/></LogoContainter>
    <OptionsContainer className='options'>
      <OptionLinkContainer to='/shop'>SHOP</OptionLinkContainer>
      <OptionLinkContainer to='/shop'>CONTACT</OptionLinkContainer>
      {currentUser ? (
        <div onClick={() => auth.signOut()}>SIGN OUT</div>
      ) : (
        <OptionLinkContainer to='/signin'>
          SIGN IN
        </OptionLinkContainer>
      )}
        <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);}


export default (Header);
