import { createStore } from "effector";
import { normalize, schema } from "normalizr";
import produce from "immer";
import { getTasksListFx, getTaskByIdFx } from "./effects";
import { toggleTask, setQueryConfig } from "./events";
import { QueryConfig } from "./types";

export const taskSchema = new schema.Entity("tasks");

export const tasksInitialState: Record<number, import("shared/api").Task> = {};

// В рамках демо некритично, но можно хранить и в виде массива без нормализации
export const $tasks = createStore(tasksInitialState)
  .on(getTasksListFx.doneData, (_, payload) => normalize(payload.data, [taskSchema]).entities.tasks)
  .on(getTaskByIdFx.doneData, (state, payload) => ({
    ...state,
    ...normalize(payload.data, taskSchema).entities.tasks,
  }))
  .on(toggleTask, (state, taskId) => produce(state, draft => {
    const task = draft[taskId];
    task.completed = !task.completed;
  }))

// Можно вынести в отдельную директорию (для хранения нескольких моделей)
export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (_, payload) => payload)
