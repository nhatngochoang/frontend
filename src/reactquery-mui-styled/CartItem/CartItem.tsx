import { Button } from '@material-ui/core';
import * as React from 'react';
import { CartItemType } from '../type';
import { Wrapper } from './CartItem.styles';

export interface CartItemProps {
   item: CartItemType;
   addToCart: (clickedItem: CartItemType) => void;
   removeFromCart: (id: number) => void;
}

export default function CartItem(props: CartItemProps) {
   const { item, addToCart, removeFromCart } = props;

   return (
      <Wrapper>
         <div>
            <h3>{item.title}</h3>
            <div className="information">
               <p>Price: ${item.price}</p>
               <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
               <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => removeFromCart(item.id)}
               >
                  -
               </Button>
               <p>{item.amount}</p>
               <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => addToCart(item)}
               >
                  +
               </Button>
            </div>
            <img src={item.image} alt={item.title} />
         </div>
      </Wrapper>
   );
}
