type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

function TodoList(props: PropsType) {
  const toCapitalTitle = props.title[0].toUpperCase() + props.title.slice(1);

  return (
    <div>
      <h3>{toCapitalTitle}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>

      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} readOnly={true} />
              <span>{task.title}</span>
            </li>
          );
        })}
      </ul>

      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;
