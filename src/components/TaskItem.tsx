import Row from "./Row";
import Column from "./Column";
import State from "../objects/taskItem/State";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
import { useContext,  useState } from "preact/hooks";
import { TaskListContext } from "../context/TaskListContext";
import { useTaskItem } from "../functions/taskApi";
interface TaskItemProps {
  item: TaskItemDto;
  index: any;
}

export const TaskItem = (props:TaskItemProps) =>{
  const taskItemDto = props.item;
  const { updateTaskState,deleteTask } = useTaskItem(taskItemDto)


  return (
    <form key={props.index} className={`mt-2 border-bottom rounded border-2`}  onSubmit={deleteTask} >
      <input type="hidden" name="formKey" value={props.item.id} />
      <Row key={props.index}>
        <Column className="col m-3 h6">{props.item.name}</Column>
        <Column className="col-1 m-auto">
          <input
            id={props.item.id}
            type="checkbox"
            onClick={updateTaskState}
            className={`form-check-input h3 `}
            checked={props.item.state === State.DONE ? true : false}
          />
        </Column>
        <Column className="col-1">
          <button
            type="submit"
            class="btn btn-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
            </svg>
          </button>
        </Column>
      </Row>
    </form>
  );
}


export default TaskItem;
