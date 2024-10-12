export interface Task {
  id: number;
  name: string;
  completed: boolean;
  dueDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  memo: string;
}