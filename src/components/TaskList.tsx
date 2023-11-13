import { Component, createContext, h, VNode } from "preact";
import TaskItem from "./TaskItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks, taskKeys } from "../functions/taskApi";
import { useState } from "preact/hooks";
import { TaskListProvider } from "../context/TaskListContext";

interface TaskListProps {
  className?: string;
}

export const TaskList = (props: TaskListProps) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: taskKeys.all(),
    queryFn: fetchTasks,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <TaskListProvider>
      <div className={`${props.className}`}>
        {data.map((task, index) => (
          <TaskItem item={task} index={index} />
        ))}
      </div>
    </TaskListProvider>
  );
};

export default TaskList;
