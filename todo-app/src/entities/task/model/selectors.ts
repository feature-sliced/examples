import { useStore, useStoreMap } from "effector-react";
import { $tasks, $queryConfig } from "./store";
import { getTaskByIdFx } from "./effects";

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

export const useTasksLoading = () => {
    return useStore(getTaskByIdFx.pending);
};

export const useTask = (taskId: number) => {
    return useTasks()[taskId];
};

export const useQueryConfig = () => {
    return useStore($queryConfig);
};
