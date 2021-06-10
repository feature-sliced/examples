import { useStore, useStoreMap } from "effector-react";
import { $tasks, $queryConfig } from "./store";
import { getTaskByIdFx } from "./effects";

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

export const useTasksLoading = () => {
    return useStore(getTaskByIdFx.pending);
};

export const useTask = (taskId: number) => {
    return useTasks()[taskId];
};

