// TaskItemService.ts

import TaskItemDto from "./TaskItemDto"; // Zaimportuj swoje DTO

class TaskItemService {
  insertTask = (dto: TaskItemDto) => {
    const taskList = this.getAllTasks();
    taskList.push(dto);
    this.saveAllTasks(taskList);
    return dto;
  };
  updateTask = (dto: TaskItemDto) => {
    const taskList = this.getAllTasks();
  
    const updatedTaskList = taskList.map(task => {
      if (task.id === dto.id) {
        return { ...task, ...dto };
      }
      return task; 
    });
  
    this.saveAllTasks(updatedTaskList);
    return dto;
  };

  deleteTask = (taskId: string) => {
    const taskList = this.getAllTasks();
    const updatedTaskList = taskList.filter(task => task.id !== taskId);
    this.saveAllTasks(updatedTaskList);
  };
  
  
  getAllTasks = (): TaskItemDto[] => {
    const storedTasks = localStorage.getItem("toDoList");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  saveAllTasks = (tasks: TaskItemDto[]) => {
    localStorage.setItem("toDoList", JSON.stringify(tasks));
  };
}

export default new TaskItemService();
