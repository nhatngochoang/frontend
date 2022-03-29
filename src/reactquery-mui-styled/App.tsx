import * as React from 'react';
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// Styles
import { Wrapper, StyledButton } from './App.styles';
import { CartItemType } from './type';
import { useQuery } from 'react-query';
import Item from './Item/Item';
import Cart from './Cart/Cart';

export interface AppProps {}

const getProducts = async (): Promise<CartItemType[]> =>
   await (await fetch('https://fakestoreapi.com/products')).json();
// if api error, use data.js

export default function App(props: AppProps) {
   const [cartOpen, setCartOpen] = React.useState(false);
   const [cartItems, setCartItems] = React.useState([] as CartItemType[]);
   const { data, isLoading, error } = useQuery<CartItemType[]>('product', getProducts);
   // console.log(data);

   const getTotalItems = (cartItems: CartItemType[]) =>
      cartItems.reduce((total: number, item) => total + item.amount, 0);

   const handleAddToCart = (clickedItem: CartItemType) => {
      setCartItems((prev) => {
         // 1. Is the item already in the cart?
         const isItemInCart = prev.find((item) => item.id === clickedItem.id);
         if (isItemInCart) {
            return prev.map((item) =>
               item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
            );
         }
         // First time the item is added
         return [...prev, { ...clickedItem, amount: 1 }];
      });
   };

   const handleRemoveFromCart = (id: number) => {
      setCartItems((prev) =>
         prev.reduce((ack, item) => {
            if (item.id === id) {
               if (item.amount === 1) return ack;
               return [...ack, { ...item, amount: item.amount - 1 }];
            } else {
               return [...ack, item];
            }
         }, [] as CartItemType[])
      );
   };

   if (isLoading) return <LinearProgress />;
   if (error) return <div>Something went wrong...</div>;
   return (
      <Wrapper>
         <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
            <Cart
               cartItems={cartItems}
               addToCart={handleAddToCart}
               removeFromCart={handleRemoveFromCart}
            />
         </Drawer>
         <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
               <AddShoppingCartIcon />
            </Badge>
         </StyledButton>
         <Grid container spacing={3}>
            {data?.map((item, idx) => {
               return (
                  <Grid item key={idx} xs={12} sm={4}>
                     <Item item={item} handleAddToCart={handleAddToCart} />
                  </Grid>
               );
            })}
         </Grid>
      </Wrapper>
   );
}
