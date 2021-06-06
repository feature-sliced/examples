// Либо использовать @loadable/component, в рамках туториала - некритично
import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TestPage = lazy(() => import("./test"));

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TestPage} />
            <Redirect to="/" />
        </Switch>
    );
};
