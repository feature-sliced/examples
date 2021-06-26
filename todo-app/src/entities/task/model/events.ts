import { createEvent } from "effector";
import type { QueryConfig } from "./types";

export const toggleTask = createEvent<number>();
export const setQueryConfig = createEvent<QueryConfig>();
