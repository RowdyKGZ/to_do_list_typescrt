import { useState } from "react";

import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValueType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  const [tasksObj, setTasks] = useState<TasksStateType>({
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
    const tasks = tasksObj[todoListId];
    const filterTasks = tasks.filter((t) => id !== t.id);

    tasksObj[todoListId] = filterTasks;
    setTasks({ ...tasksObj });
  }

  function removeTodoList(todoListId: string) {
    let filteredTodoList = todoLists.filter((t1) => t1.id !== todoListId);
    delete tasksObj[todoListId];
    setTodoList(filteredTodoList);
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoList([...todoLists]);
    }
  }

  function addTask(title: string, todoListId: string) {
    const newTask: TaskType = { id: v1(), title, isDone: false };
    tasksObj[todoListId] = [newTask, ...tasksObj[todoListId]];
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const tasks = tasksObj[todoListId];
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function addTodoList(title: string) {
    const todoList: TodoListType = { id: v1(), title, filter: "all" };
    setTodoList([todoList, ...todoLists]);
    setTasks({ ...tasksObj, [todoList.id]: [] });
  }

  function cahngeNewTitleTodoList(todoListId: string, newTitle: string) {
    const todoList = todoLists.find((todoList) => todoList.id === todoListId);
    if (todoList) {
      todoList.title = newTitle;
    }

    setTodoList([...todoLists]);
  }

  function onChangeStatusHandler(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    const tasks = tasksObj[todoListId];
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  return (
    <div className="App">
      <AddItemForm addItem={(title) => addTodoList(title)} />
      {todoLists.map((tl) => {
        let taskForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
        }

        return (
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
            onChangeTaskTitle={onChangeStatusHandler}
            cahngeNewTitleTodoList={cahngeNewTitleTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
