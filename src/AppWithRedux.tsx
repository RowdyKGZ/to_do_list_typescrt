import TodoList, { TaskType } from "./TodoList";
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
} from "./state/todolist-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/task-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValueType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.task
  );

  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(todoListId, id);
    dispatch(action);
  }

  function removeTodoList(todoListId: string) {
    const action = RemoveTodolistAC(todoListId);

    dispatch(action);
  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    dispatch(ChangeFilterTodolistAC(todoListId, value));
  }

  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId);
    dispatch(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(todoListId, taskId, isDone);
    dispatch(action);
  }

  function addTodoList(title: string) {
    const action = AddTodolistAC(title);

    dispatch(action);
  }

  function cahngeNewTitleTodoList(todoListId: string, newTitle: string) {
    dispatch(ChangeTitleTodolistAC(todoListId, newTitle));
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
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
            let taskForTodoList = tasks[tl.id];
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

export default AppWithRedux;
