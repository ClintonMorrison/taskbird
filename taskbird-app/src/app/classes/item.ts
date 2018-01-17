import { Project } from './project';

export class Item {
  id: number;
  description: string;
  priority: string;
  done: boolean;
  date_completed: string;
  date_created: string;
  date_due: string;
  date_modified: string;
  project?: Project;
}


