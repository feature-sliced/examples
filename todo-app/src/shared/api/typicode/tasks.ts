import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import type { Task } from "./models";

const BASE_URL = "/todos"

export type GetTasksListParams = {
    userId?: number;
    completed?: boolean;
};

export const getTasksList = (params?: GetTasksListParams) => {
    return apiInstance.get<Task[]>(BASE_URL, { params });
};

export type GetTaskByIdParams = {
    taskId: number;
    [x: string]: any;
};

export const getTaskById = ({ taskId, ...params }: GetTaskByIdParams): AxiosPromise<Task> => {
    return apiInstance.get(`${BASE_URL}/${taskId}`, { params });
};
