import React, { useContext } from 'react';
import { Context } from './ContextProvider.jsx';

export const Table = props => {
   const { state: { tables } } = useContext(Context)
   return (
      <div className="table">
         <h2>Table</h2>
         <ul>
            {tables.map((table, idx) => {
               return (
                  <li key={idx}>
                     Table # {table.tableId} - {table.customer.name}
                  </li>
               )
            })}
         </ul>
      </div>
   );
};

/*
import * as React from 'react';
import { Context } from './ContextProvider';
import { Customer } from './Reservation';

export interface TableProps {}

export interface TableData {
   tableId: string;
   customer: Customer;
}

export default function Table(props: TableProps) {
   const {
      state: { tables },
   } = React.useContext(Context);
   return (
      <div className="table">
         <h2>Table</h2>
         <ul>
            {tables.map((table: TableData, idx: any) => {
               return (
                  <li key={idx}>
                     Table # {table.tableId} - {table.customer.name}
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

*/

