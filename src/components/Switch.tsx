import { h, VNode } from "preact";
import SwtichType from "../obj/SwtichType";
import ToDoItem from "../obj/ToDoItem";

interface SwitchProps {
  state: SwtichType;
  toDo: ToDoItem;
}

export function Switch(props: SwitchProps): VNode {
  
  return (
    <input type="checkbox" className={`form-check-input h3 `}/>
  );
}

export default Switch;
