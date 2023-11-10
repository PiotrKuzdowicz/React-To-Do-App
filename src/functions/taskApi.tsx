import { useContext, useState } from "preact/hooks";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import State from "../objects/taskItem/State";
import { TaskListContext } from "../context/TaskListContext";

export const taskKeys = {
  all: () => fetchTasks(),
  detail: (id) => getTask(id),
};

export const fetchTasks = () => {
  const storedTasks = localStorage.getItem("toDoList");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveAllTasks = (tasks: TaskItemDto[]) => {
  localStorage.setItem("toDoList", JSON.stringify(tasks));
};

const getTask = (id: string) => {
  const allTasks = fetchTasks();
  const foundTask = allTasks.find((task) => task.id === id);
  return foundTask ? { ...foundTask } : null;
};

export const useTaskItem = (taskItem: TaskItemDto) => {
  const { updateList } = useContext(TaskListContext);
  const [taskItemState, setTaskItemState] = useState(taskItem.state);
  const queryClient = useQueryClient();

  const deleteTask = (event) => {
    event.preventDefault();
    deleteTaskMutation.mutate(taskItem.id);
  };

  const updateTaskState = (event) => {
    event.preventDefault();
    const checked = event.target.checked === false ? State.UNDONE : State.DONE;
    taskItem.state = checked;
    updateTaskItem.mutate(taskItem);
  };

  const deleteTaskMutation = useMutation({
    mutationKey: taskKeys.detail(taskItem.id),
    mutationFn: async (taskItemId: string) => {
      const oldTasks = taskKeys.all();
      const updatedTaskList = oldTasks.filter((task) => task.id !== taskItemId);
      saveAllTasks(updatedTaskList);
      queryClient.resetQueries({
        queryKey: taskKeys.detail(taskItem.id),
        exact: true,
      });
      updateList();
    },
  });

  const updateTaskItem = useMutation({
    mutationKey: taskKeys.detail(taskItem.id),
    mutationFn: async (taskItem: TaskItemDto) => {
      const oldTasks = taskKeys.all();

      setTaskItemState(taskItem.state);
      const updatedTasks = oldTasks.map((task) => {
        if (task.id === taskItem.id) {
          return { ...task, ...taskItem };
        }
        return task;
      });

      saveAllTasks(updatedTasks);
    },
  });

  return {
    updateTaskState,
    deleteTask,
  };
};

export const useTaskForm = () => {
  const queryClient = useQueryClient();
  const insertTask = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskName = formData.get("taskNameInput").toString();
    if (taskName === "") {
      return;
    }
    const newTaskItemDto = new TaskItemDto(taskName, State.UNDONE);
    insertTaskMutation.mutate(newTaskItemDto);
    formData.set('taskNameInput','')
  };

  const insertTaskMutation = useMutation({
    mutationKey: ["insertDto"],
    mutationFn: async (taskItemDto: TaskItemDto) => {
      const taskList = taskKeys.all();
      taskList.push(taskItemDto);
      saveAllTasks(taskList);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(taskKeys.all());
    },
  });

  return {
    insertTask,
  };
};
