import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Lab1 from './lab1';
import Lab2 from './lab2';
import Lab3 from './lab3';
import './index.css';

export interface LabProps {}
const linkList = [
   { label: 'Lab1 - Form', path: '/lab/lab1' },
   { label: 'Lab2 - Context + Reducer', path: '/lab/lab2' },
   { label: 'Lab3 - Class Exercise', path: '/lab/lab3' },
];
export default function Lab(props: LabProps) {
   return (
      <div>
         <ul>
            {linkList.map((link, linkidx) => {
               return (
                  <li key={linkidx}>
                     <Link to={link.path}>{link.label}</Link>
                  </li>
               );
            })}
         </ul>
         <Switch>
            <Route path="/lab/lab1" component={Lab1} />
            <Route path="/lab/lab2" component={Lab2} />
            <Route path="/lab/lab3" component={Lab3} />
         </Switch>
      </div>
   );
}
