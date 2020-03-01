export class Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  date_created: string;
  status?: string;
}

export interface ProjectMap {
  [key: number]: Project
}
