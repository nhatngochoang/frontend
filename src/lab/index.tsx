import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Lab1 from './lab1';

export interface LabProps {}

export default function Lab(props: LabProps) {
   return (
      <div>
         <ul>
            <li>
               <Link to="/lab/lab1">Lab1 - Form</Link>
            </li>
         </ul>
         <Switch>
            <Route path="/lab/lab1" component={Lab1} />
         </Switch>
      </div>
   );
}
