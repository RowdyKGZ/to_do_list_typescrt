import { ChangeEvent } from "react";

import { FilterValueType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

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
      <EditableSpan onChange={changeTitleTodoList} title={toCapitalTitle} />
      <Button onClick={removeTodoList}>
        <Delete />
      </Button>

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
              <Checkbox
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveHandler} aria-label="delete">
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>

      <div style={{ marginBottom: "70px" }}>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onClickAll}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onClickActive}
        >
          Active
        </Button>{" "}
        <Button
          color="secondary"
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onClickComplited}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
