import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

import { typicodeApi } from "shared/api";
import { createBaseSelector } from "shared/lib/redux-std";

// Этот файл можно разделить на меньшие файлы при увеличении в нём колличество логики,
// можно так же разделить слайс на несколько слайсов, тогда reducers будет содержать несколько редьюссеров

const entityAdapter = createEntityAdapter<import("shared/api").Task>({
  selectId: (task) => task.id,
});

const adapterSelectors = entityAdapter.getSelectors();

const initialState = entityAdapter.getInitialState({
  isTaskListLoading: false,
  isTaskDetailsLoading: false,
});

type State = typeof initialState;

// Повторение структуры папок упрощает навигацию и защищает от конфликтов
const reducerPath = "entities/tasks";

const slice = createSlice({
  name: reducerPath,
  initialState,
  reducers: {
    setTaskListLoading(state, action: PayloadAction<boolean>) {
      state.isTaskListLoading = action.payload;
    },
    setTaskDetailsLoading(state, action: PayloadAction<boolean>) {
      state.isTaskDetailsLoading = action.payload;
    },
    toggleCompleted(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const task = adapterSelectors.selectById(state, id);
      if (task) {
        entityAdapter.updateOne(state, {
          id,
          changes: {
            completed: !task.completed,
          },
        });
      }
    },
  },
  extraReducers: (build) => {
    build.addCase(getList.fulfilled, entityAdapter.upsertMany);
    build.addCase(getById.fulfilled, entityAdapter.upsertOne);
  },
});

// actions
const getList = createAsyncThunk(
  reducerPath + "/get-list",
  (params: typicodeApi.tasks.GetTasksListParams | undefined, { dispatch }) => {
    dispatch(slice.actions.setTaskListLoading(true));
    return typicodeApi.tasks
      .getTasksList(params)
      .then((res) => res.data)
      .finally(() => {
        dispatch(slice.actions.setTaskListLoading(false));
      });
  }
);

const getById = createAsyncThunk(
  reducerPath + "/get-by-id",
  (params: typicodeApi.tasks.GetTaskByIdParams, { dispatch }) => {
    dispatch(slice.actions.setTaskListLoading(true));
    return typicodeApi.tasks
      .getTaskById(params)
      .then((res) => res.data)
      .finally(() => {
        dispatch(slice.actions.setTaskListLoading(false));
      });
  }
);

// selecotrs
const baseSelector = createBaseSelector<State>(reducerPath);

const isListLoading = createSelector(
  baseSelector,
  (state) => state.isTaskListLoading
);
const isDetailsLoading = createSelector(
  baseSelector,
  (state) => state.isTaskListLoading
);

const list = createSelector(baseSelector, adapterSelectors.selectAll);
const isListEmpty = createSelector(list, (l) => l.length === 0);

const details = createSelector(
  baseSelector,
  (_: unknown, id: number) => id,
  adapterSelectors.selectById
);

// public API

// Мы определяем только публичные экшоны, мы защищаем инварианты нашего состояния
// (например инвариант что isTaskListLoading === true когда происходит выборка)
export const actions = {
  getList,
  getById,
  toggleCompleted: slice.actions.toggleCompleted,
};

// Мы определяем только публичные селекторы, таким образом мы скрываем структуру данных нашего состояния
export const selectors = {
  isListLoading,
  isDetailsLoading,
  list,
  isListEmpty,
  details,
};

// Мы экспортируем структуру редьюссеров целиком, таким образом reducerPath остаётся приватным
export const reducers = { [reducerPath]: slice.reducer };
