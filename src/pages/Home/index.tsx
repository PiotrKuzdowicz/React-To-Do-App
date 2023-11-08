import { h, VNode } from "preact";
import { useState, useEffect } from "preact/hooks";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Column from "../../components/Column";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";
import ToDoItem from "../../obj/ToDoItem";

export function Home(): VNode {
  const [taskList, setTaskList] = useState(getTasks());

  useEffect(() => {
  }, []);

  const handleTaskAdded = () => {
    setTaskList(getTasks()); 
  };

  function getTasks() {
    const toDoItems = [];
    const value = localStorage.getItem("toDoList");

    if (value == null) {
      return toDoItems;
    }

    const parsedValue = JSON.parse(value);

    if (Array.isArray(parsedValue)) {
      parsedValue.forEach((itemData) => {
        const toDoItem = new ToDoItem(itemData.name, itemData.isCompleted);
        toDoItems.push(toDoItem);
      });
    } else {
      const toDoItem = new ToDoItem(parsedValue.name, parsedValue.isCompleted);
      toDoItems.push(toDoItem);
    }

    return toDoItems;
  }

  return (
    <Container>
      <Row className="mt-5 border-bottom">
        <h1>ToDo App</h1>
      </Row>
      <Row className="mt-4">
        <Column className="col-8">
          <TaskList  taskList={taskList} />
        </Column>
        <Column className="col-4">
          <TaskForm onTaskAdded={handleTaskAdded} />
        </Column>
      </Row>
    </Container>
  );
}
