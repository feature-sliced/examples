import { createStore, combine } from "effector";
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

/**
 * @remark Можно добавить потенциально debounce логику
 */
export const $loading = combine(
  getTasksListFx.pending, 
  getTaskByIdFx.pending, 
  (tasksList, taskDetails) => ({
    tasksList,
    taskDetails,
  })
);

/** "Список" задач */
export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));

/**
 * Отфильтрованные таски
 * @remark Можно разруливать на уровне эффектов - но тогда нужно подключать дополнительную логику в стор
 * > Например скрывать/показывать таск при `toggleTask` событии
 */
export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) => {
    return tasksList.filter(task => (
      config.completed === undefined ||
      task.completed === config.completed
  ));
  }
);
