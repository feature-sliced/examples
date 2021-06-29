import { Layout, Row, Col, Typography, Spin, Empty } from "antd"; // ~ "shared/ui/{...}"
import { variant, list } from "@effector/reflect";
import { combine } from "effector";

import { TasksFilters } from "features/tasks-filters";
import { ToggleTask } from "features/toggle-task";
import { TaskRow, taskModel } from "entities/task";
import styles from "./styles.module.scss";

const TasksListPage = () => {
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
          <PageContent />
        </Row>
      </Layout.Content>
    </Layout>
  );
};

const ListItemView: React.FC<{ task: import("shared/api").Task }> = ({ task }) => {
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

// Использование effector-reflect здесь опционально и некритично в рамках методологии
const TasksList = list({
  view: ListItemView,
  source: taskModel.$tasksFiltered,
  bind: {},
  mapItem: {
    task: (task) => task,
  },
});
// Использование effector-reflect здесь опционально и некритично в рамках методологии
const PageContent = variant({
  source: combine(
    {
      isLoading: taskModel.$tasksListLoading,
      isEmpty: taskModel.$tasksListEmpty,
    },
    ({ isLoading, isEmpty }) => {
      if (isLoading) return "loading";
      if (isEmpty) return "empty";
      return "ready";
    }
  ),
  cases: {
    loading: () => <Spin size="large" />,
    empty: () => <Empty description="No tasks found" />,
    ready: TasksList,
  },
  hooks: {
    mounted: taskModel.effects.getTasksListFx.prepend(() => {}),
  },
});

export default TasksListPage;
