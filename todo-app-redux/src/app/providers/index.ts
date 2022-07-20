import compose from "compose-function";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";

export const withProviders = compose(withStore, withRouter);
