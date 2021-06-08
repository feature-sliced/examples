import { TasksFilters } from "features/tasks-filters";
import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import { Layout } from "antd"; // ~ "shared/ui/layout"

const TasksListPage = () => {
    const tasks = taskModel.selectors.useTasksList();
    const isLoading = taskModel.selectors.useTasksLoading();

    taskModel.hooks.useTasksSync();

    return (
        <Layout>
            {/* ~ Layout.Toolbar */}
            <Layout>
                <TasksFilters loading={isLoading} />
            </Layout>
            <Layout.Content>
                {tasks.map((task) => (
                    <TaskCard 
                        data={task}
                        titleHref={`/${task.id}`}
                        // direction="horizontal"
                        size="small"
                        hoverable
                    >
                        <ToggleTask taskId={task.id} />
                    </TaskCard>
                ))}
            </Layout.Content>
        </Layout>
    )
}

export default TasksListPage;
