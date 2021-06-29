import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";
import { normalize, schema } from "normalizr";
import produce from "immer";

import { typicodeApi } from "shared/api";
import type { Task } from "shared/api";

export type QueryConfig = {
  completed?: boolean;
  userId?: number;
};


const toggleTask = createEvent<number>();
const setQueryConfig = createEvent<QueryConfig>();


// В каждом эффекте так же может быть своя доп. обработка
const getTasksListFx = createEffect((params?: typicodeApi.tasks.GetTasksListParams) => {
  return typicodeApi.tasks.getTasksList(params);
});
const getTaskByIdFx = createEffect((params: typicodeApi.tasks.GetTaskByIdParams) => {
  return typicodeApi.tasks.getTaskById(params);
});


// Можно вынести нормализацию на уровне API
export const taskSchema = new schema.Entity("tasks");
export const normalizeTask = (data: Task) => normalize(data, taskSchema);
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema]);


// В рамках демо некритично, но можно хранить и в виде массива без нормализации
export const tasksInitialState: Record<number, Task> = {};
export const $tasks = createStore(tasksInitialState)
  .on(getTasksListFx.doneData, (_, payload) => normalizeTasks(payload.data).entities.tasks)
  .on(getTaskByIdFx.doneData, (state, payload) => ({
    ...state,
    ...normalizeTask(payload.data).entities.tasks,
  }))
  .on(toggleTask, (state, taskId) => produce(state, draft => {
    const task = draft[taskId];
    task.completed = !task.completed;
    console.log(1, { taskId, state, draft: draft[taskId].completed });
  }))


// Можно вынести в отдельную директорию (для хранения нескольких моделей)
export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (_, payload) => payload)

// Можно добавить потенциально debounce логику
export const $tasksListLoading = getTasksListFx.pending;
export const $taskDetailsLoading = getTaskByIdFx.pending;


/** 
 * "Список" задач 
 */
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
  ))},
);

export const $tasksListEmpty = $tasksFiltered.map((list) => list.length === 0);

// При желании можно завести отдельный селектор, не завязанный на react биндинги
const useTask = (taskId: number): import("shared/api").Task | undefined => {
  return useStore($tasks)[taskId];
};

export const events = {
  toggleTask,
  setQueryConfig,
};

export const effects = {
  getTaskByIdFx,
  getTasksListFx,
};

export const selectors = {
  useTask,
};
