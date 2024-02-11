import { combineReducers, legacy_createStore as createStore } from "redux";
import { todolistReducer } from "./todolist-reducer";
import { tasksReducer } from "./task-reducer";

const rootReducer = combineReducers({
  todolists: todolistReducer,
  task: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
