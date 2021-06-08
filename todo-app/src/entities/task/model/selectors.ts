import { useStore, useStoreMap } from "effector-react";
import { $tasks } from "./store";
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