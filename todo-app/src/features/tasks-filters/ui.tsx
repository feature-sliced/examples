import { Radio } from "antd"; // ~ "shared/ui/radio"

import { taskModel } from "entities/task";
import { filtersList, getFilterById, DEFAULT_FILTER } from "./config";

type Props = {
    loading?: boolean;
}

export const TasksFilters = ({ loading }: Props) => {
    return (
        <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
            {filtersList.map(({ title, id }) => (
                <Radio.Button 
                    key={id} 
                    onClick={() => taskModel.tasks.events.setQueryConfig(getFilterById(id).config)}
                    value={id}
                    disabled={loading}
                >
                    {title}
                </Radio.Button>
            ))}
        </Radio.Group>
    )
}