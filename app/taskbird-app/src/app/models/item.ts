import { Project } from './project';

export class Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  done: boolean;
  date_completed: string;
  date_created: string;
  date_due: string;
  date_modified: string;
  project?: Project;
  status?: string;
}

export interface TaskMap {
  [key: number]: Task;
}

export interface StringTaskMap {
  [key: string]: Task[];
}
