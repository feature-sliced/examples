import { useEffect } from "react";
import { useQueryConfig } from "./selectors";
import { getTasksListFx } from "./effects";

/**
 * Синхронизация фетчинга списка задач с актуальными фильтрами
 * @remark При желании, можно переименовать в другой файл (пока что же - коллизии с effects)
 */
 export const useTasksSync = () => {
    const queryConfig = useQueryConfig();

    useEffect(() => {
        getTasksListFx(queryConfig);
    }, [queryConfig]);
};

