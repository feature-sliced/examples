import { RootState } from "./root-state";

export const createBaseSelector = <T>(rootKey: string) => {
  return (state: RootState) => {
    if (rootKey in state) {
      return state[rootKey] as T;
    } else {
      throw new Error(`Reducer ${rootKey} in not registered`);
    }
  };
};
