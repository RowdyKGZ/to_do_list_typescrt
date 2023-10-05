import { useState } from "react";

import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValueType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Typescript", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Webpack", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValueType>("all");

  function removeTask(id: string) {
    const filterTasks = tasks.filter((t) => id !== t.id);

    setTasks(filterTasks);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  function addTask(title: string) {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];

    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  let taskForTodoList = tasks;
  if (filter === "completed") {
    taskForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    taskForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={taskForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
