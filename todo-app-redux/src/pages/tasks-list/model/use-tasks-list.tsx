import { useEffect } from "react";
import { useAction, useAppSelector } from "shared/lib/redux-std";
import { taskModel } from "entities/task";
import { taskFiltersModel } from "features/tasks-filters";

export function useTasksList() {
  const isLoading = useAppSelector(taskModel.selectors.isListLoading);
  const isEmpty = useAppSelector(taskModel.selectors.isListEmpty);
  const fetchList = useAction(taskModel.actions.getList);
  const tasks = useAppSelector(taskFiltersModel.selectors.filteredTasksList);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    isLoading,
    isEmpty,
    tasks,
  };
}
