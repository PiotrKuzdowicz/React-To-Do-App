import { v4 as uuidv4 } from 'uuid';

abstract class AbstractDto {
  id: string;

  constructor(id?: string) {
    this.id = id || uuidv4();
  }
}

export default AbstractDto;