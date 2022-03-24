import * as React from 'react';
import './index.css';
import Form from './Form';
import List from './List';
export interface Lab1Props {}

export interface People {
   name: string;
   age: number;
   bio: string;
}

export default function Lab1(props: Lab1Props) {
   const [size, setSize] = React.useState<number | string>();
   const [peopleList, setPeopleList] = React.useState<People[]>([
      {
         name: 'Nhat',
         age: 20,
         bio: 'Hello everyone',
      },
   ]);
   return (
      <div className="lab-container">
         <Form peopleList={peopleList} setPeopleList={setPeopleList} />
         <List peopleList={peopleList} />
      </div>
   );
}
