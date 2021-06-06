import compose from "compose-function";
import { withRouter } from "./with-router";

export const withProviders = compose(withRouter);
