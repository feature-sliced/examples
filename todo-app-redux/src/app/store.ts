import { configureStore } from "@reduxjs/toolkit";

import { taskModel } from "entities/task";
import { taskFiltersModel } from "features/tasks-filters";

export const store = configureStore({
  reducer: {
    ...taskModel.reducers,
    ...taskFiltersModel.reducers,
  },
});
