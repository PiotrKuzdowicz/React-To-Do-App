import { Component, ComponentChild, h, RenderableProps, VNode } from "preact";
import { useState } from "preact/hooks";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
import { effect, Signal } from "@preact/signals";
import State from "../objects/taskItem/State";
import  TaskItemService from "../objects/taskItem/TaskItemService"

interface TaskFormProps {
  toDoList: Signal;
}

class TaskForm extends Component<TaskFormProps> {
  render(
    props?: RenderableProps<TaskFormProps, any>,
    state?: Readonly<{}>,
    context?: any
  ): ComponentChild {
    const [taskName, setTaskName] = useState("");

    
    const handleSubmit = (e: Event) => {
      if (taskName === "") {
        return;
      }
      e.preventDefault();
      this.props.toDoList.value = [
        ...this.props.toDoList.value,
        TaskItemService.insertTask(new TaskItemDto(taskName, State.UNDONE)),
      ];
      
      setTaskName("");
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
}
// export function TaskForm(props: TaskFormProps): VNode {
//   const [taskName, setTaskName] = useState("");

//   effect(() => {
//     const toDoList = JSON.parse(localStorage.getItem("toDoList") || "[]");
//     localStorage.setItem("toDoList", JSON.stringify(props.toDoList.value));
//   });

//   const handleSubmit = (e: Event) => {
//     if (taskName === "") {
//       return;
//     }
//     e.preventDefault();

//     props.toDoList.value = [
//       ...props.toDoList.value,
//       new ToDoItem(taskName, State.UNDONE),
//     ];
//     setTaskName("");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div class="mb-3">
//           <label for="taskName" class="form-label h5 mt-2 ">
//             Zadanie
//           </label>
//           <input
//             type="text"
//             class="form-control"
//             id="taskNameInput"
//             placeholder="Tu wpisz twoje zadanie"
//             value={taskName}
//             onInput={(e) => setTaskName((e.target as HTMLInputElement).value)}
//           />
//         </div>
//         <button type="submit" class="btn btn-dark">
//           Dodaj
//         </button>
//       </form>
//     </div>
//   );
// }

export default TaskForm;
