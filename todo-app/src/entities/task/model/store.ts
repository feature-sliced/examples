import { createStore } from "effector";
import { normalize, schema } from "normalizr";
import { getTasksListFx } from "./effects";
import { toggleTask, setQueryConfig } from "./events";
import { QueryConfig } from "./types";

export const taskSchema = new schema.Entity("tasks");

export const tasksInitialState: Record<number, import("shared/api").Task> = {};

// В рамках демо некритично, но вполне возможно, что стоило бы хранить отдельно массив TaskId[]
export const $tasks = createStore(tasksInitialState)
  .on(getTasksListFx.doneData, (_, tasks) => normalize(tasks.data, [taskSchema]).entities.tasks)
  .on(toggleTask, (state, taskId) => {
      const task = state[taskId];
      return {
          ...state,
          [taskId]: {
              ...task,
              completed: !task.completed
          }
      }
  })

//   Можно вынести в отдельную директорию (для хранения нескольких моделей)
export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (_, payload) => payload)
