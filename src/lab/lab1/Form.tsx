import * as React from 'react';
import { People } from './index';

export interface FormProps {
   peopleList: People[];
   setPeopleList: React.Dispatch<React.SetStateAction<People[]>>;
}

const initialState: People = {
   name: 'Your name',
   age: 18,
   bio: 'Your bio',
};
export default function Form({ peopleList, setPeopleList }: FormProps) {
   const [data, setData] = React.useState(initialState);
   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };
   // console.log(data);
   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPeopleList([...peopleList, data]);
   };
   return (
      <div className="form-container">
         <h1>Form</h1>
         <form onSubmit={handleFormSubmit}>
            <input
               type="text"
               name="name"
               placeholder="Name"
               id="name"
               onChange={handleChange}
               value={data.name}
            />
            <input
               type="number"
               name="age"
               placeholder="Age"
               id="age"
               value={data.age}
               onChange={handleChange}
            />
            <textarea
               name="bio"
               id="bio"
               placeholder="Bio"
               onChange={handleChange}
               value={data.bio}
            ></textarea>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
}
