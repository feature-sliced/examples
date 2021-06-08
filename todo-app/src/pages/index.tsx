// Либо использовать @loadable/component, в рамках туториала - некритично
import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TasksListPage} />
            <Route exact path="/:taskId" component={TaskDetailsPage} />
            <Redirect to="/" />
        </Switch>
    );
};
