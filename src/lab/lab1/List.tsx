import * as React from 'react';
import { People } from './index';

export interface ListProps {
   peopleList: People[];
}

export default function List(props: ListProps): JSX.Element {
   const { peopleList } = props;

   return (
      <div className="list-container">
         <h1>List</h1>
         {peopleList.map((people, peopleidx) => {
            return (
               <div className="list-item-container" key={peopleidx}>
                  {people.name} - {people.age} - {people.bio}
               </div>
            );
         })}
      </div>
   );
}
