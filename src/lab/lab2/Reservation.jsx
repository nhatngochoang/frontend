import { customAlphabet } from "nanoid";
import React, { useContext, useState } from 'react';
import { Context } from "./ContextProvider.jsx";

const nanoid = customAlphabet('123456789asdfghjkl', 5)
const Reservation = props => {
   const [name, setName] = useState("")
   const { dispatch, state: { reservations } } = useContext(Context)

   const handleAddCustomer = (customer) => {
      const tableId = nanoid()
      dispatch({ type: "ADD_CUSTOMER_TABLE", payload: { tableId, customer } })
      dispatch({ type: "REMOVE_CUSTOMER_RESERVATION", payload: { customerId: customer.customerId } })
   }
   const handleFormSubmit = (e) => {
      e.preventDefault()
      const newCustomer = {
         customerId: nanoid(),
         name,
      }
      dispatch({ type: "ADD_CUSTOMER_RESERVATION", payload: newCustomer })
      setName("")
   }
   return (
      <div className="reservation">
         <h2>Reservation</h2>
         {/* Form */}
         <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />{" "}
            <button type="submit"> Add to Reservation</button>
         </form >
         {/* List */}
         <ul>
            {reservations.map((customer, idx) => {
               return (
                  <li key={idx}>
                     Customer # {customer.customerId} - {customer.name} {" "}
                     <button onClick={() => handleAddCustomer(customer)}>Add to Table</button>
                  </li>
               )
            })}
         </ul>
      </div>
   );
};

export default Reservation;

/*

import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { ActionKind, Context } from './ContextProvider';

export interface ReservationProps {}

export interface Customer {
   customerId: string;
   name: string;
}

const nanoid = customAlphabet('123456789asdfghjkl', 5);

export default function Reservation(props: ReservationProps) {
   const [name, setName] = React.useState('');
   const {
      dispatch,
      state: { reservations },
   } = React.useContext(Context);

   const handleAddCustomer = (customer: Customer) => {
      const tableId = nanoid();
      dispatch({ type: ActionKind.ADD_CUSTOMER_RESERVATION, payload: { tableId } });
      dispatch({
         type: ActionKind.REMOVE_CUSTOMER_RESERVATION,
         payload: { tableId, customer },
      });
   };
   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newCustomer = {
         customerId: nanoid(),
         name,
      };
      dispatch({
         type: ActionKind.ADD_CUSTOMER_RESERVATION,
         payload: {
            customer: newCustomer,
         },
      });
      setName('');
   };

   return (
      <div className="reservation">
         <h2>Reservation</h2>
        //  Form 
         <form onSubmit={handleFormSubmit}>
            <input
               type="text"
               name="name"
               id="name"
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />{' '}
            <button type="submit"> Add to Reservation</button>
         </form>
        // List 
         <ul>
            {reservations.map((customer: Customer, idx: any) => {
               return (
                  <li key={idx}>
                     Customer # {customer.customerId} - {customer.name}{' '}
                     <button onClick={() => handleAddCustomer(customer)}>Add to Table</button>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

*/