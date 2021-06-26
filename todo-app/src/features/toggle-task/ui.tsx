import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { taskModel, taskLib } from "entities/task";

export type ToggleTaskProps = {
    taskId: number;
    withStatus?: boolean;
}

// resolve / unresolve
export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
    const task = taskModel.tasks.selectors.useTask(taskId);

    if (!task) return null;

    const status = taskLib.getTaskStatus(task);

    return (
        <Checkbox 
            onClick={() => taskModel.tasks.events.toggleTask(taskId)} 
            checked={task.completed}
        >
            {withStatus && status}
        </Checkbox>
    )
}