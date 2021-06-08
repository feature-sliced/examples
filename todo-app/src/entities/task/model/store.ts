import { createStore } from "effector";
import { normalize, schema } from "normalizr";
import { getTasksListFx } from "./effects";
import { toggleTask } from "./events";

export const taskSchema = new schema.Entity("tasks");

export const $tasksInitialState: Record<number, import("shared/api").Task> = {};

export const $tasks = createStore($tasksInitialState)
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
