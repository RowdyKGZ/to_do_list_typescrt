import { ChangeEvent, KeyboardEvent, useState } from "react";

import { FilterValueType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValueType;
  removeTask: (value: string, todoListId: string) => void;
  changeFilter: (value: FilterValueType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (taskId: string) => void;
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
      props.addTask(newTaskTitle, props.id);

      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addTask(newTaskTitle, props.id);
    setNewTaskTitle("");
  };

  const onClickAll = () => props.changeFilter("all", props.id);
  const onClickActive = () => props.changeFilter("active", props.id);
  const onClickComplited = () => props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <h3>
        {toCapitalTitle} <button onClick={removeTodoList}>X</button>
      </h3>
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
            props.removeTask(task.id, props.id);
          };

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
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

// function AddItemForm(props) {
//   const [newTaskTitle, setNewTaskTitle] = useState("");

//   const onChangeNewTastTitle = (e: ChangeEvent<HTMLInputElement>) =>
//     setNewTaskTitle(e.currentTarget.value);

//   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     setError(null);
//     if (e.key.toLowerCase() === "enter") {
//       props.addTask(newTaskTitle, props.id);

//       setNewTaskTitle("");
//     }
//   };

//   <div>
//     <input
//       className={error ? "error" : ""}
//       type="text"
//       value={newTaskTitle}
//       onChange={onChangeNewTastTitle}
//       onKeyDown={onKeyDown}
//     />
//     <button onClick={addTask}>+</button>
//     {error && <p className="error-message">field is requred</p>}
//   </div>;
// }
