import { useStore, useStoreMap } from "effector-react";
import { $tasks, $queryConfig } from "./store";
import { getTaskByIdFx, getTasksListFx } from "./effects";

export const useQueryConfig = () => {
    return useStore($queryConfig);
};

export const useTasks = () => {
    return useStore($tasks);
};

export const useTasksList = () => {
    return useStoreMap({
        store: $tasks,
        keys: ["tasksList"],
        fn: (state) => Object.values(state)
    })
};

/**
 * Можно разруливать на уровне эффектов - но тогда нужно подключать дополнительную логику в стор
 * @remark Например скрывать/показывать таск при `toggleTask` событии
 */
export const useTasksListFiltered = () => {
    const tasksList = useTasksList();
    const queryConfig = useQueryConfig();

    return tasksList.filter(task => (
        queryConfig.completed === undefined ||
        task.completed === queryConfig.completed
    ));
};

/**
 * @remark Можно добавить потенциально debounce логику
 */
export const useLoading = () => {
    const tasksList = useStore(getTasksListFx.pending);
    const taskDetails = useStore(getTaskByIdFx.pending);
    return {tasksList, taskDetails}
};


export const useTask = (taskId: number): import("shared/api").Task | undefined => {
    return useTasks()[taskId];
};

