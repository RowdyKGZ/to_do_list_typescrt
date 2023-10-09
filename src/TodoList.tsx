import { ChangeEvent } from "react";

import { FilterValueType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
  cahngeNewTitleTodoList: (newTitle: string, todoListId: string) => void;
  onChangeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => void;
};

function TodoList(props: PropsType) {
  const toCapitalTitle = props.title[0].toUpperCase() + props.title.slice(1);

  const onClickAll = () => props.changeFilter("all", props.id);
  const onClickActive = () => props.changeFilter("active", props.id);
  const onClickComplited = () => props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTitleTodoList = (newTitle: string) => {
    props.cahngeNewTitleTodoList(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <EditableSpan onChange={changeTitleTodoList} title={toCapitalTitle}>
        <button onClick={removeTodoList}>X</button>
      </EditableSpan>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.id);
          };

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newTitle: string) => {
            props.onChangeTaskTitle(task.id, newTitle, props.id);
          };

          return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan title={task.title} onChange={onChangeTitleHandler}>
                <button onClick={onRemoveHandler}>X</button>
              </EditableSpan>
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
