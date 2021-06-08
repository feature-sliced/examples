import { Link } from "react-router-dom";
import type { RouteChildrenProps } from "react-router-dom";
import { Layout, Result, Button } from "antd"; // ~ "shared/ui/{layout, result}"

import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";

type Props = RouteChildrenProps<{
    taskId: string;
}>;

const TaskDetailsPage = (props: Props) => {
    const taskId = Number(props.match?.params.taskId);
    const task = taskModel.selectors.useTask(taskId);

    if (!task) {
        return (
            <Result 
                status="404"
                title="404"
                subTitle="Task was not found"
                extra={<Link to="/"><Button type="primary">Back to tasks list</Button></Link>}
            />
        )
    }

    return (
        <Layout>
            <Layout> {/* ~ Layout.Toolbar */}
                <Link to="/">Back to tasks list</Link>
            </Layout>
            <Layout.Content>
                <TaskCard data={task} size="default">
                    <ToggleTask taskId={task.id} />
                </TaskCard>
            </Layout.Content>
        </Layout>
    )
};

export default TaskDetailsPage;
