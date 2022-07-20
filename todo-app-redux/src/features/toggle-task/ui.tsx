import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"

import { taskLib } from "entities/task";
import { useToggleTask } from "./model/use-toggle-task";

export type ToggleTaskProps = {
  taskId: number;
  withStatus?: boolean;
};

// resolve / unresolve
export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
  const { task, toggleTaskCompleted } = useToggleTask(taskId);

  if (!task) return null;

  const status = taskLib.getTaskStatus(task);

  return (
    <Checkbox
      onClick={() => toggleTaskCompleted(task)}
      checked={task.completed}
    >
      {withStatus && status}
    </Checkbox>
  );
};
