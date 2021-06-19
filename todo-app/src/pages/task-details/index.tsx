import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Result, Button, Row, Spin } from "antd"; // ~ "shared/ui/{...}"

import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import styles from "./styles.module.scss";

type Props = import("react-router-dom").RouteChildrenProps<{
    taskId: string;
}>;

const TaskDetailsPage = (props: Props) => {
    const taskId = Number(props.match?.params.taskId);
    const task = taskModel.selectors.useTask(taskId);
    const isLoading = taskModel.selectors.useLoading().taskDetails;

    useEffect(() => {
        taskModel.effects.getTaskByIdFx({ taskId });
    }, [taskId]);

    if (!task && !isLoading) {
        return (
            <Result 
                status="404"
                title="404"
                subTitle="Task was not found"
                extra={<Link to="/"><Button type="primary">Back to tasks list {taskId}</Button></Link>}
            />
        )
    }

    // Можно обработать и лучше
    if (isLoading) return <Placeholder />

    return (
        <Layout className={styles.root}>
            <Layout.Content className={styles.content}>
                <TaskCard
                    data={task}
                    size="default"
                    loading={isLoading}
                    className={styles.card}
                    bodyStyle={{ height: 400 }}
                    extra={<Link to="/">Back to TasksList</Link>}
                    actions={[
                        <ToggleTask key="toggle" taskId={taskId} />
                    ]}
                />
            </Layout.Content>
        </Layout>
    )
};

const Placeholder = () => (
    <Layout className={styles.root}>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Spin size="large" />
        </Row>
    </Layout>
);

export default TaskDetailsPage;
