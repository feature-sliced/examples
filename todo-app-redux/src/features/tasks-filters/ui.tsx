import { Radio } from "antd"; // ~ "shared/ui/radio"

import { taskModel } from "entities/task";
import { useAction, useAppSelector } from "shared/lib/redux-std";
import { filtersList, getFilterById, DEFAULT_FILTER } from "./config";
import * as taskFiltersModel from "./model";

export const TasksFilters = () => {
  const disabled = useAppSelector(taskModel.selectors.isListLoading);
  const onFilterClick = useAction(taskFiltersModel.actions.setFilters);
  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id }) => (
        <Radio.Button
          key={id}
          onClick={() => onFilterClick(getFilterById(id).config)}
          value={id}
          disabled={disabled}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
