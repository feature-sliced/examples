import { createStore } from "effector";
import { normalize, schema } from "normalizr";
import { getTasksListFx } from "./effects";

export const taskSchema = new schema.Entity("tasks");

export const $tasksInitialState: Record<number, import("shared/api").Task> = {};

export const $tasks = createStore($tasksInitialState)
  .on(getTasksListFx.doneData, (_, tasks) => normalize(tasks.data, [taskSchema]).entities.tasks);
