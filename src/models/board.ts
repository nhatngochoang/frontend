import { Section } from './section';

export interface Board {
   id: string;
   user: any;
   icon: string;
   title: string;
   description: string;
   position: number;
   favourite: boolean;
   favouritePosition: number;
   sections: Section[];
}
