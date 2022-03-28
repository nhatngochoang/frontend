import * as React from 'react';
import ContextProvider from './ContextProvider.jsx';
import Reservation from './Reservation.jsx';
import { Table } from './Table.jsx';
// import ContextProvider from './typescript/ContextProvider';
// import Reservation from './typescript/Reservation';
// import Table from './typescript/Table';

export interface Lab2Props {}

export default function Lab2(props: Lab2Props) {
   return (
      <ContextProvider>
         <div className="lab-container">
            <Reservation />
            <Table />
         </div>
      </ContextProvider>
   );
}
