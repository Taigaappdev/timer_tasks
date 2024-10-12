import { Component } from '@angular/core';
import { Task } from './task.model';
import { SegmentedBar, SegmentedBarItem } from '@nativescript/core';

@Component({
  selector: 'ns-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  newTaskName = '';
  newTaskDueDate: Date = new Date();
  newTaskStatus: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
  newTaskMemo = '';
  viewMode: 'list' | 'calendar' = 'list';

  segmentedBarItems: SegmentedBarItem[] = [
    new SegmentedBarItem(),
    new SegmentedBarItem()
  ];

  constructor() {
    this.segmentedBarItems[0].title = 'リスト';
    this.segmentedBarItems[1].title = 'カレンダー';
    this.loadTasks();
  }

  addTask() {
    const newTask: Task = {
      id: this.tasks.length + 1,
      name: this.newTaskName,
      completed: false,
      dueDate: this.newTaskDueDate,
      status: this.newTaskStatus,
      memo: this.newTaskMemo
    };
    this.tasks.push(newTask);
    this.saveTasks();
    this.newTaskName = '';
    this.newTaskDueDate = new Date();
    this.newTaskStatus = 'Not Started';
    this.newTaskMemo = '';
  }

  getIncompleteTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    task.status = task.completed ? 'Completed' : 'In Progress';
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  onViewModeChange(args: any) {
    this.viewMode = args.object.selectedIndex === 0 ? 'list' : 'calendar';
  }

  getCurrentMonthDays(): Date[] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  }

  getTasksForDate(date: Date): Task[] {
    return this.tasks.filter(task => 
      task.dueDate.getFullYear() === date.getFullYear() &&
      task.dueDate.getMonth() === date.getMonth() &&
      task.dueDate.getDate() === date.getDate()
    );
  }

  saveTasks() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
  }

  loadTasks() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
      this.tasks.forEach(task => {
        task.dueDate = new Date(task.dueDate);
      });
    }
  }
}