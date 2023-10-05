import { ChangeEvent, KeyboardEvent, useState } from "react";

import { FilterValueType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValueType;
  removeTask: (value: string) => void;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
};

function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const toCapitalTitle = props.title[0].toUpperCase() + props.title.slice(1);

  const onChangeNewTastTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key.toLowerCase() === "enter") {
      props.addTask(newTaskTitle);

      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const onClickAll = () => props.changeFilter("all");
  const onClickActive = () => props.changeFilter("active");
  const onClickComplited = () => props.changeFilter("completed");

  console.log(props.filter);

  return (
    <div>
      <h3>{toCapitalTitle}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          type="text"
          value={newTaskTitle}
          onChange={onChangeNewTastTitle}
          onKeyDown={onKeyDown}
        />
        <button onClick={addTask}>+</button>
        {error && <p className="error-message">field is requred</p>}
      </div>

      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id);
          };

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked);
          };

          return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onClickAll}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onClickActive}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onClickComplited}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
