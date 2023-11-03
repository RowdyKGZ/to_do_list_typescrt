import { TasksStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./task-reducer";
import { AddTodolistAC, RemoveTodolistAC } from "./todolist-reducer";

const startState: TasksStateType = {
  todoListId1: [
    { id: "1", title: "HTML&CSS", isDone: true },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "React", isDone: true },
  ],
  todoListId2: [
    { id: "1", title: "Car", isDone: true },
    { id: "2", title: "Home", isDone: true },
    { id: "3", title: "Job", isDone: false },
  ],
};

test("correct test should be delete task from correct array", () => {
  const action = removeTaskAC("todoListId2", "2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(2);
  expect(endState["todoListId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct test should be add task from correct array", () => {
  const title = "apple";
  const action = addTaskAC(title, "todoListId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe(title);
  expect(endState["todoListId2"][0].isDone).toBe(false);
});

test("correct test status of task should be changed", () => {
  const action = changeTaskStatusAC("todoListId1", "2", false);

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"][1].isDone).toBe(false);
  expect(endState["todoListId2"][1].isDone).toBe(true);
});

test("correct test title of task should be changed", () => {
  const action = changeTaskTitleAC("todoListId1", "2", "banana");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"][1].title).toBe("banana");
});

test("new with property array should be added when new todolist is added", () => {
  const action = AddTodolistAC("New Todo List");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(3);

  expect(endState[keys[keys.length - 1]]).toStrictEqual([]);
});

test("property with todolist should be deleted", () => {
  const action = RemoveTodolistAC("todoListId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);

  expect(endState["todoListId2"]).toBeUndefined();
});
