import { createEvent } from "effector";
import produce from "immer";

import { taskModel } from "entities/task";

const toggleTask = createEvent<number>();

taskModel.$tasks.on(toggleTask, (state, taskId) =>
  produce(state, (draft) => {
    const task = draft[taskId];
    task.completed = !task.completed;
  })
);

export const events = { toggleTask };
