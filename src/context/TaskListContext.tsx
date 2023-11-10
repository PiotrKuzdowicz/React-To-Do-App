import { createContext, h, FunctionComponent } from 'preact';
import {  useQueryClient } from "@tanstack/react-query";
import { taskKeys } from '../functions/taskApi';
export const TaskListContext = createContext<{  updateList: () => void }>({
  updateList: () => {},
});

export const TaskListProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const updateList = () => {
    queryClient.invalidateQueries(taskKeys.all());
  };

  return <TaskListContext.Provider value={{ updateList }}>{children}</TaskListContext.Provider>;
};
