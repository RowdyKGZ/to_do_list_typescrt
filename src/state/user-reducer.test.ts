import { userReducer } from "./user-reducer";

test("user reducer should increment only age", () => {
  const startState = { age: 20, childrenCount: 2, name: "Edvard" };

  const endState = userReducer(startState, { type: "INCREMENT-AGE" });

  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
});

test("user reducer should increment only childrenCount", () => {
  const startState = { age: 20, childrenCount: 2, name: "Edvard" };

  const endState = userReducer(startState, { type: "INCREMENT-CHILD-COUNT" });

  expect(endState.age).toBe(20);
  expect(endState.childrenCount).toBe(3);
});

test("user reducer change name of user", () => {
  const startState = { age: 20, childrenCount: 2, name: "Edvard" };
  const newName = "Edik";

  const endState = userReducer(startState, { type: "CHANGE-NAME", newName });

  expect(endState.name).toBe(newName);
});

export {};
