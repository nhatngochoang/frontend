import * as React from 'react';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../type';
import { Wrapper } from './Cart.style';

export interface CartProps {
   cartItems: CartItemType[];
   addToCart: (clickedItem: CartItemType) => void;
   removeFromCart: (id: number) => void;
}

export default function Cart(props: CartProps) {
   const { cartItems, addToCart, removeFromCart } = props;

   const calculateTotal = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

   return (
      <Wrapper>
         <h2>Your Shopping Cart</h2>
         {cartItems.length === 0 ? <p>No item in cart.</p> : null}
         {cartItems.map((item) => {
            return (
               <CartItem
                  key={item.id}
                  item={item}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
               />
            );
         })}
         <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
   );
}
