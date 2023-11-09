import State from "./State";
import { v4 as uuidv4 } from "uuid";
import AbstractDto from "../abstract/AbstractDto";
class TaskItemDto extends AbstractDto {
  name: string;
  state: State;
  constructor(name: string, state: State,id?:string) {
    super(id);
    this.name = name;
    this.state = state;
  }
}

export default TaskItemDto;
