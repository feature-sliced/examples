import { Layout, Row, Typography, Spin, Empty, Col } from "antd"; // ~ "shared/ui/{...}"

import { TaskRow } from "entities/task";
import { TasksFilters } from "features/tasks-filters";
import { ToggleTask } from "features/toggle-task";
import styles from "./styles.module.scss";
import * as taskListPageModel from "./model";

const TasksListPage = () => {
  const { isLoading, isEmpty, tasks } = taskListPageModel.useTasksList();

  const getContent = () => {
    if (isLoading) {
      return <Spin size="large" />;
    }
    if (isEmpty) {
      return <Empty description="No tasks found" />;
    }
    return tasks.map((task) => <ListItemView task={task} key={task.id} />);
  };

  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        {/* ~ Layout.Toolbar */}
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilters />
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {getContent()}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

const ListItemView: React.FC<{ task: import("shared/api").Task }> = ({
  task,
}) => {
  return (
    <Col key={task.id} span={24}>
      <TaskRow
        data={task}
        titleHref={`/${task.id}`}
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
    </Col>
  );
};

export default TasksListPage;
