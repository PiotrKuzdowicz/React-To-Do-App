import { useContext, useState } from "preact/hooks";
import TaskItemDto from "../objects/taskItem/TaskItemDto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import State from "../objects/taskItem/State";
import { TaskListContext } from "../context/TaskListContext";

export const taskKeys = {
  all: () => ["taskList"],
  detail: (id) => [...taskKeys.all(), id],
  insert: () => ["insertDto"],
  updateTask: () => ["updateTask"],
  deleteTask: () => ["deleteTask"],
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
    updateTaskItemMutation.mutate(taskItem);
  };

  const deleteTaskMutation = useMutation({
    mutationKey: taskKeys.deleteTask(),
    onMutate: async (taskItemId) => {
      //Pobieram sobie dane z cache
      const tasksInCache: TaskItemDto[] = queryClient.getQueryData(
        taskKeys.all()
      );
      //Filtruje sobie dto na pozniej gdyby nie udalo sie zapisanie do localstorage, to musze w cache sobie odzyskać ten obiekt
      const taskItemDto = tasksInCache.filter((task) => task.id === taskItemId);
      //Filtruje sobie dane tak aby usunac ten obiekt
      const updatedTasks = tasksInCache.filter(
        (task) => task.id !== taskItemId
      );
      //Zapisuje do cache
      queryClient.setQueryData(taskKeys.all(), updatedTasks);
      //Zwracam w context dto na pozniej
      return taskItemDto;
    },
    mutationFn: async (taskItemId: string) => {
      const oldTasks = fetchTasks();
      const updatedTaskList = oldTasks.filter((task) => task.id !== taskItemId);
      saveAllTasks(updatedTaskList);
      return updatedTaskList
    },
    onError: (error, variables, context) => {
      //Jak sie nie udalo to przywracam z do cache dane
      queryClient.setQueryData(taskKeys.all(), ((old:TaskItemDto[]) => {
      return [...old,...context]
      }),);
    },
    onSuccess: (result, variables, context) => {
      //Jak sie udalo to zapisuje dane z localstorage to cache
      queryClient.setQueryData(taskKeys.all(), result);
    },
  });

  const updateTaskItemMutation = useMutation({
    mutationKey: taskKeys.updateTask(),
    onMutate: async (taskItemDto) => {
      // Pobieram aktualne dane z cache
      const tasksInCache: TaskItemDto[] = queryClient.getQueryData(
        taskKeys.all()
      );
      await queryClient.cancelQueries({ queryKey: taskKeys.all() });
      // Podmieniam aktualne dane
      const updatedData = tasksInCache.map((task) => {
        if (task.id === taskItemDto.id) {
          return { ...task, ...taskItemDto };
        }
        return task;
      });
      // Zapisuje do cache
      queryClient.setQueryData(taskKeys.all(), updatedData);
      return { taskItemDto };
    },
    mutationFn: async (taskItemDto: TaskItemDto) => {
      const oldTasks = fetchTasks();
      const updatedTasks = oldTasks.map((task) => {
        if (task.id === taskItemDto.id) {
          return { ...task, ...taskItemDto };
        }
        return task;
      });

      saveAllTasks(updatedTasks);
      return taskItemDto;
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(taskKeys.all(), (old: TaskItemDto[]) =>
        old.map((taskDto) =>
          taskDto.id === context.taskItemDto.id ? result : taskDto
        )
      );
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
    formData.set("taskNameInput", "");
  };

  const insertTaskMutation = useMutation({
    mutationKey: taskKeys.insert(),
    onMutate: async (taskItemDto) => {
      // Pobieram aktualne dane z cache
      const tasksInCache: TaskItemDto[] = queryClient.getQueryData(
        taskKeys.all()
      );
      await queryClient.cancelQueries({ queryKey: taskKeys.all() });
      // Podmieniam aktualne dane
      tasksInCache.push(taskItemDto);
      // Zapisuje do cache
      queryClient.setQueryData(taskKeys.all(), tasksInCache);

      return { taskItemDto };
    },
    mutationFn: async (taskItemDto: TaskItemDto) => {
      const taskList = fetchTasks();
      taskList.push(taskItemDto);
      saveAllTasks(taskList);
      return taskItemDto;
    },
    onSuccess: (result, variables, context) => {

      queryClient.setQueryData(taskKeys.all(), (old: TaskItemDto[]) =>
      old.map((taskDto) =>
        taskDto.id === context.taskItemDto.id ? result : taskDto
      )
    );
    queryClient.invalidateQueries({queryKey: taskKeys.all()})

    },
  });

  return {
    insertTask,
  };
};
