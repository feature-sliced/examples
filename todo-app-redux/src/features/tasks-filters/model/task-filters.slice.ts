import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskModel } from "entities/task";
import { createBaseSelector } from "shared/lib/redux-std";
import { TaskFilters } from "./task-filters.type";

const reducerPatch = "features/task-filters";
const slice = createSlice({
  name: reducerPatch,
  initialState: {} as TaskFilters,
  reducers: {
    setFilters(_, action: PayloadAction<TaskFilters>) {
      return action.payload;
    },
  },
});

const baseSelector = createBaseSelector<TaskFilters>(reducerPatch);

const filteredTasksList = createSelector(
  taskModel.selectors.list,
  baseSelector,
  (taskList, filters) => {
    return taskList.filter((item) => {
      if ("completed" in filters) {
        return filters.completed === item.completed;
      }
      return true;
    });
  }
);

export const actions = {
  ...slice.actions,
};

export const selectors = {
  filteredTasksList,
};

export const reducers = {
  [reducerPatch]: slice.reducer,
};
