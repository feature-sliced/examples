import { ToggleTask } from "features/toggle-task";
import { TasksFilters } from "features/tasks-filters";
import { taskModel } from "entities/task";

const TestPage = () => {
    const tasks = taskModel.selectors.useTasksList();
    const isLoading = taskModel.selectors.useTasksLoading();

    taskModel.hooks.useTasksSync();
    
    return (
        <div>
            Test Page
            <TasksFilters loading={isLoading} />
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <ToggleTask key={task.id} taskId={task.id} />
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestPage;
