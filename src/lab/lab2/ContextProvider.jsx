import React, { useReducer } from 'react';

export const Context = React.createContext()

const reducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case "ADD_CUSTOMER_RESERVATION":
         return { ...state, reservations: [...state.reservations, payload] }
      case "ADD_CUSTOMER_TABLE":
         return { ...state, tables: [...state.tables, payload] }
      case "REMOVE_CUSTOMER_RESERVATION":
         const { customerId } = payload
         const reservations = state.reservations.filter(
            (customer) => customer.customerId !== customerId
         )
         return { ...state, reservations }
      default:
         return new Error('Invalid type')
   }
}

const ContextProvider = props => {
   const { children } = props
   const initialState = {
      reservations: [],
      tables: []
   }
   const [state, dispatch] = useReducer(reducer, initialState)
   const value = { state, dispatch }
   return (
      <Context.Provider value={value}>
         {children}
      </Context.Provider>
   );
};


export default ContextProvider;


/*
import * as React from 'react';
import { Customer } from './Reservation';
import { TableData } from './Table';

export enum ActionKind {
   ADD_CUSTOMER_RESERVATION = 'ADD_CUSTOMER_RESERVATION',
   ADD_CUSTOMER_TABLE = 'ADD_CUSTOMER_TABLE',
   REMOVE_CUSTOMER_RESERVATION = 'REMOVE_CUSTOMER_RESERVATION',
}

export interface PayloadAction {
   type: ActionKind;
   payload: {
      tableId?: string;
      customer?: { customerId: string; name: string };
   };
}

export interface DataState {
   reservations: Customer[];
   tables: TableData[];
}

interface AppContext {
   state: DataState;
   dispatch: React.Dispatch<PayloadAction>;
}

const defaultValue: AppContext = {
   state: {
      reservations: [{ customerId: 'idDefault', name: 'nameDefault' }],
      tables: [
         { tableId: 'idDefault', customer: { customerId: 'idDefault', name: 'nameDefault' } },
      ],
   },
   dispatch: () => {},
};
export const Context = React.createContext<AppContext>(defaultValue);

const reducer = (state: DataState, action: PayloadAction) => {
   const { type, payload } = action;
   switch (type) {
      case ActionKind.ADD_CUSTOMER_RESERVATION:
         return { ...state, reservations: [...state.reservations, payload] };
      case ActionKind.ADD_CUSTOMER_TABLE:
         return { ...state, tables: [...state.tables, payload] };
      case ActionKind.REMOVE_CUSTOMER_RESERVATION:
         const customerId = payload.customer?.customerId;
         const reservations = state.reservations.filter(
            (customer) => customer.customerId !== customerId
         );
         return { ...state, reservations };
      default:
         console.log('Invalid type');
         return state;
   }
};

export interface ContextProviderProps {
   children: JSX.Element;
}

export default function ContextProvider({ children }: ContextProviderProps) {
   const initialState: DataState = {
      reservations: [],
      tables: [],
   };
   const [state, dispatch] = React.useReducer(reducer, initialState);

   const sampleAppContext: AppContext = {
      state,
      dispatch,
   };

   return <Context.Provider value={sampleAppContext}>{children}</Context.Provider>;
}

*/