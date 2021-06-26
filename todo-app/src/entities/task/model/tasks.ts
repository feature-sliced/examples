import { createStore, createEvent, createEffect } from "effector";
import { normalize, schema } from "normalizr";
import produce from "immer";
import { typicodeApi } from "shared/api";
import type { Task } from "shared/api";

export const toggleTask = createEvent<number>();


export const getTasksListFx = createEffect((params?: typicodeApi.tasks.GetTasksListParams) => {
    // Здесь также может быть доп. обработка эффекта
    return typicodeApi.tasks.getTasksList(params);
});

export const getTaskByIdFx = createEffect((params: typicodeApi.tasks.GetTaskByIdParams) => {
    // Здесь также может быть доп. обработка эффекта
    return typicodeApi.tasks.getTaskById(params);
});


export const taskSchema = new schema.Entity("tasks");
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema]);


// В рамках демо некритично, но можно хранить и в виде массива без нормализации
export const tasksInitialState: Record<number, Task> = {};
export const $tasks = createStore(tasksInitialState)
  .on(getTasksListFx.doneData, (_, payload) => normalizeTasks(payload.data).entities.tasks)
  .on(getTaskByIdFx.doneData, (state, payload) => ({
    ...state,
    ...normalize(payload.data, taskSchema).entities.tasks,
  }))
  .on(toggleTask, (state, taskId) => produce(state, draft => {
    const task = draft[taskId];
    task.completed = !task.completed;
  }))
