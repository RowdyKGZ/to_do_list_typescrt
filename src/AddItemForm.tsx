import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemPropsType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeNewTastTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key.toLowerCase() === "enter") {
      props.addItem(newTaskTitle);

      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addItem(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
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
  );
}

export default AddItemForm;
