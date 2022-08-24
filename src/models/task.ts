import { Section } from './section';

export interface Task {
   id: string;
   section: Section;
   title: string;
   content: string;
   position: number;
   createdAt: Date;
}
