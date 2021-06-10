import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { taskModel } from "entities/task";

export type ToggleTaskProps = {
    taskId: number;
    withStatus?: boolean;
}

// resolve / unresolve
export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
    const task = taskModel.selectors.useTask(taskId);
    if (!task) return null;

    const status = taskModel.getters.getTaskStatus(task);

    return (
        <Checkbox 
            onClick={() => taskModel.events.toggleTask(taskId)} 
            checked={task.completed}
        >
            {withStatus && status}
        </Checkbox>
    )
}