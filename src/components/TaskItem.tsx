import { Component, h } from "preact";
import Row from "./Row";
import Column from "./Column";
import ToDoItem from "../objects/taskItem/TaskItemDto";
import State from "../objects/taskItem/State";
import { Signal, effect, signal } from "@preact/signals";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
import TaskItemService from "../objects/taskItem/TaskItemService";

interface TaskItemProps {
  item: Signal;
  index: any;
  onDelete: (id:string) => void;
  onUpdate: (taskList:TaskItemDto[]) => void;
}

export class TaskItem extends Component<TaskItemProps> {
  constructor(props: TaskItemProps) {
    super(props);
  }

  //Funkcja która zmienia stan zadania
  toggle = (e) => {
    const taskItem = this.props.item.value;
    const checked = e.target.checked === false ? State.UNDONE : State.DONE;
    this.props.item.value = TaskItemService.updateTask(new ToDoItem(taskItem.name, checked, taskItem.id));
    this.props.onUpdate(TaskItemService.getAllTasks())
  };

  handleSubmit = (e: Event) => {
    
    const { item, index } = this.props;
    const taskItem = item.value;

    e.preventDefault();
    TaskItemService.deleteTask(taskItem.id);
    this.props.onDelete(taskItem.id);
  };

  render() {

  
    const { item, index } = this.props;
    const taskItem = item.value;
    return (
      <form key={index} className={`mt-2 border-bottom rounded border-2`} onSubmit={this.handleSubmit}>
        <input type="hidden" name="formKey" value={taskItem.id} />
        <Row key={index}>
          <Column className="col m-3 h6">{taskItem.name}</Column>
          <Column className="col-1 m-auto">
            <input
              id={taskItem.id}
              type="checkbox"
              onClick={this.toggle}
              className={`form-check-input h3 `}
              checked={taskItem.state === State.DONE ? true : false}
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
}

export default TaskItem;
