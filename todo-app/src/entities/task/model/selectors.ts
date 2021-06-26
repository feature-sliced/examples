import { $tasks } from "./store";

export const selectTaskById = (taskId: number): import("shared/api").Task | undefined => {
    return $tasks.getState()[taskId];
};
