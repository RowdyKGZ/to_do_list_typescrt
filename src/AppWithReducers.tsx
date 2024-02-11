import { useReducer } from "react";

import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  AddTodolistAC,
  ChangeFilterTodolistAC,
  ChangeTitleTodolistAC,
  RemoveTodolistAC,
  todolistReducer,
} from "./state/todolist-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/task-reducer";

export type FilterValueType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, dispatchTodolistReducer] = useReducer(todolistReducer, [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Typescript", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Webpack", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Car", isDone: true },
      { id: v1(), title: "Home", isDone: true },
      { id: v1(), title: "Job", isDone: false },
      { id: v1(), title: "Phone", isDone: true },
      { id: v1(), title: "Skin", isDone: false },
      { id: v1(), title: "T-Short", isDone: true },
    ],
  });

  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(todoListId, id);
    dispatchTasksReducer(action);
  }

  function removeTodoList(todoListId: string) {
    const action = RemoveTodolistAC(todoListId);

    dispatchTodolistReducer(action);
    dispatchTasksReducer(action);
  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    dispatchTodolistReducer(ChangeFilterTodolistAC(todoListId, value));
  }

  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId);
    dispatchTasksReducer(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(todoListId, taskId, isDone);
    dispatchTasksReducer(action);
  }

  function addTodoList(title: string) {
    const action = AddTodolistAC(title);

    dispatchTasksReducer(action);
    dispatchTodolistReducer(action);
  }

  function cahngeNewTitleTodoList(todoListId: string, newTitle: string) {
    dispatchTodolistReducer(ChangeTitleTodolistAC(todoListId, newTitle));
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    dispatchTasksReducer(changeTaskTitleAC(todoListId, taskId, newTitle));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={(title) => addTodoList(title)} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            let taskForTodoList = tasksObj[tl.id];
            if (tl.filter === "completed") {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "active") {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid key={tl.id} item>
                <Paper style={{ padding: "20px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    onChangeTaskTitle={changeTaskTitle}
                    cahngeNewTitleTodoList={cahngeNewTitleTodoList}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
