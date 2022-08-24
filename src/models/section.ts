import { Task } from './task';

export interface Section {
   id: string;
   board: any;
   title: string;
   tasks: Task[];
}
