import { taskModel } from "entities/task";
import { useAppSelector, useAction } from "shared/lib/redux-std";

export function useToggleTask(taskId: number) {
  const task = useAppSelector((state) =>
    taskModel.selectors.details(state, taskId)
  );
  const toggleTaskCompleted = useAction(taskModel.actions.toggleCompleted);

  return { task, toggleTaskCompleted };
}
