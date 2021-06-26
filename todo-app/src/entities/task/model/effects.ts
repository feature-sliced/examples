import { createEffect } from "effector";
import { typicodeApi } from "shared/api";

export const getTasksListFx = createEffect((params?: typicodeApi.tasks.GetTasksListParams) => {
    // Здесь также может быть доп. обработка эффекта
    return typicodeApi.tasks.getTasksList(params);
});

export const getTaskByIdFx = createEffect((params: typicodeApi.tasks.GetTaskByIdParams) => {
    // Здесь также может быть доп. обработка эффекта
    return typicodeApi.tasks.getTaskById(params);
});
