import { v1 } from "uuid";
import {
  AddTodolistAC,
  ChangeFilterTodolistAC,
  ChangeTitleTodolistAC,
  RemoveTodolistAC,
  todolistReducer,
} from "./todolist-reducer";
import { TodoListType } from "../App";

let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodoListType> = [
  {
    id: todolistId1,
    title: "What to learn",
    filter: "all",
  },
  {
    id: todolistId2,
    title: "What to buy",
    filter: "all",
  },
];

test("correct todolist should be removed", () => {
  const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let newTdoolistTitle = "New Todolist";

  const endState = todolistReducer(startState, AddTodolistAC(newTdoolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTdoolistTitle);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should be changed title", () => {
  let newTdoolistTitle = "New Todolist";

  const endState = todolistReducer(
    startState,
    ChangeTitleTodolistAC(todolistId2, newTdoolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTdoolistTitle);
});

test("correct todolist should be changed filter", () => {
  const endState = todolistReducer(
    startState,
    ChangeFilterTodolistAC(todolistId2, "active")
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].filter).toBe("active");
});

export {};
