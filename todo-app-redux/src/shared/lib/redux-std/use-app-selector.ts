import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "./root-state";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
