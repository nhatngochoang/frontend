import * as React from 'react';
import { CartItemType } from '../type';
import { Wrapper } from './Item.styles';
import { Button } from '@material-ui/core';
export type ItemProps = {
   item: CartItemType;
   handleAddToCart: (clickedItem: CartItemType) => void;
};

export default function Item({ item, handleAddToCart }: ItemProps) {
   return (
      <Wrapper>
         <img src={item.image} alt="Item" />
         <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>{item.price}</h3>
         </div>
         <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
      </Wrapper>
   );
}
