import { useStore, useStoreMap } from "effector-react";
import * as tasks from "./tasks";
import * as queryConfig from "./query-config";

const useQueryConfig = () => {
    return useStore(queryConfig.$queryConfig);
};

const useTasks = () => {
    return useStore(tasks.$tasks);
};

const useTasksList = () => {
    return useStoreMap({
        store: tasks.$tasks,
        keys: ["tasksList"],
        fn: (state) => Object.values(state)
    })
};

/**
 * Можно разруливать на уровне эффектов - но тогда нужно подключать дополнительную логику в стор
 * @remark Например скрывать/показывать таск при `toggleTask` событии
 */
const useTasksListFiltered = () => {
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
const useLoading = () => {
    const tasksList = useStore(tasks.getTasksListFx.pending);
    const taskDetails = useStore(tasks.getTaskByIdFx.pending);
    return {tasksList, taskDetails}
};


const useTask = (taskId: number): import("shared/api").Task | undefined => {
    return useTasks()[taskId];
};

export const selectors = {
    useQueryConfig,
    useTasks,
    useTask,
    useLoading,
    useTasksListFiltered,
};

export { tasks, queryConfig };