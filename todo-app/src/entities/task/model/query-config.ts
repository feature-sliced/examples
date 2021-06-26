import { createStore, createEvent } from "effector";

export type QueryConfig = {
    completed?: boolean;
    userId?: number;
};

export const setQueryConfig = createEvent<QueryConfig>();

export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (_, payload) => payload)
