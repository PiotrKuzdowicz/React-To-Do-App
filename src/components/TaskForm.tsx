import { h, VNode } from "preact";
import { useState } from "preact/hooks";
import Row from "./Row";
import Column from "./Column";
import ToDoItem from "../obj/ToDoItem";

interface TaskFormProps {
  onTaskAdded: () => void; 
}

export function TaskForm(props: TaskFormProps): VNode {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: Event) => {
    if (taskName === "") {
      return;
    }
    e.preventDefault();

    const currentToDoListJSON = localStorage.getItem("toDoList");
    let currentToDoList = [];
    if (currentToDoListJSON) {
      currentToDoList = JSON.parse(currentToDoListJSON);
    }
    const task = new ToDoItem(taskName, false);
    currentToDoList.push(task);
    localStorage.setItem("toDoList", JSON.stringify(currentToDoList));

    setTaskName("");

    props.onTaskAdded();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="taskName" class="form-label h5 mt-2 ">
            Zadanie
          </label>
          <input
            type="text"
            class="form-control"
            id="taskNameInput"
            placeholder="Tu wpisz twoje zadanie"
            value={taskName}
            onInput={(e) => setTaskName((e.target as HTMLInputElement).value)}
          />
        </div>
        <button type="submit" class="btn btn-dark">
          Dodaj
        </button>
      </form>
    </div>
  );
}

export default TaskForm;