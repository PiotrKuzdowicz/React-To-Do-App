import { Component, h, VNode } from "preact";
import Row from "./Row";
import Column from "./Column";
import ToDoItem from "../objects/taskItem/TaskItemDto";
import State from "../objects/taskItem/State";
import { signal, Signal } from "@preact/signals";
import TaskItem from "./TaskItem";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
interface TaskListProps  {
  className?: string;
  taskList: Signal;
}


export function TaskList(props: TaskListProps): VNode {

  function onDelete(id:string){
    const updatedToDoList = props.taskList.value.filter((item) => item.id !== id);
     props.taskList.value = updatedToDoList;
  }
  function onUpdate(taskList:TaskItemDto[]){
    props.taskList.value = taskList;
  }

  return (
    <div className={`${props.className}`}>
      {props.taskList.value.map((toDo, index) => (
        <TaskItem item={signal(toDo)} index={index} onDelete={onDelete} onUpdate={onUpdate}/>
      ))}
    </div>
  );
}

export default TaskList;
