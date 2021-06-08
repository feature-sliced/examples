// Либо использовать @loadable/component, в рамках туториала - некритично
import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TasksListPage} />
            <Redirect to="/" />
        </Switch>
    );
};
