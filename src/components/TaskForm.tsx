import { Component, ComponentChild, h, RenderableProps, VNode } from "preact";
import { useState } from "preact/hooks";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
import { effect, Signal } from "@preact/signals";
import State from "../objects/taskItem/State";
import { useTaskForm } from "../functions/taskApi";

interface TaskFormProps {

}

export const TaskForm = (props: TaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const {insertTask} = useTaskForm();


  const handleFormSubmit = (event: Event) => {
    insertTask(event);
    setTaskName(""); 
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div class="mb-3">
          <label for="taskName" class="form-label h5 mt-2 ">
            Zadanie
          </label>
          <input
            type="text"
            class="form-control"
            id="taskNameInput"
            name="taskNameInput"
            value={taskName}
            placeholder="Tu wpisz twoje zadanie"
            onInput={(e) => setTaskName((e.target as HTMLInputElement).value)}
          />
        </div>
        <button type="submit" class="btn btn-dark">
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
