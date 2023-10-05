import TodoList from "./TodoList";
function App() {
  let task1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: true },
  ];

  let task2 = [
    { id: 1, title: "Harry Poter", isDone: true },
    { id: 2, title: "Forsaj", isDone: false },
    { id: 3, title: "Bogem Rapsody", isDone: true },
  ];

  let task3 = [
    { id: 1, title: "Carry", isDone: true },
    { id: 2, title: "Happy", isDone: true },
    { id: 3, title: "Scary", isDone: false },
  ];

  return (
    <div className="App">
      <TodoList title="What to learn" tasks={task1} />
      <TodoList title="Movies" tasks={task2} />
      <TodoList title="songs" tasks={task3} />
    </div>
  );
}

export default App;
