import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const client = new QueryClient();
export interface AppProps {}

export default function Index(props: AppProps) {
   return (
      <QueryClientProvider client={client}>
         <App />
      </QueryClientProvider>
   );
}
