import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useAction = <A extends any[]>(
  // Можно написать более строгие типы если нужно
  actionCreator: (...args: A) => any
) => {
  const dispatch = useDispatch();
  return useCallback(
    (...args: A) => dispatch(actionCreator.apply(null, args)),
    [actionCreator, dispatch]
  );
};
