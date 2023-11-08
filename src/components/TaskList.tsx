import { h, VNode } from "preact";
import Row from "./Row";
import Column from "./Column";
import ToDoItem from "../obj/ToDoItem";
import Switch from "./Switch";
import SwtichType from "../obj/SwtichType";
interface TaskListProps {
  className?: string;
  taskList: ToDoItem[];
}

export function TaskList(props: TaskListProps): VNode {
  return (
    <div className={`${props.className}`}>
      {props.taskList.map((toDo, index) => (
        <form key={index} className={`mt-2 border-bottom rounded border-2 ${getClasses(toDo)}`}>
          <Row key={index}>
            <Column className="col m-3 h6">{toDo.name}</Column>
            <Column className="col-1 m-auto">
              <Switch state={SwtichType.DONE} toDo={toDo} />
            </Column>
          </Row>
        </form>
      ))}
    </div>
  );
}

function getClasses(toDo){
  return toDo.isCompleted ?'done' : 'undone';
}

export default TaskList;
