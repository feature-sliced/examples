import { useEffect } from "react";

import { useAction, useAppSelector } from "shared/lib/redux-std";
import { taskModel } from "entities/task";

export function useTaskDetails(taskId: number) {
  const isLoading = useAppSelector(taskModel.selectors.isDetailsLoading);
  const task = useAppSelector((state) =>
    taskModel.selectors.details(state, taskId)
  );
  const fetchTask = useAction(taskModel.actions.getById);

  useEffect(() => {
    fetchTask({ taskId });
  }, [fetchTask, taskId]);

  return {
    task,
    isLoading,
  };
}
