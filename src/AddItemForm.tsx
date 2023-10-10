import { IconButton, TextField } from "@material-ui/core";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { ControlPoint } from "@material-ui/icons";

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
    <div style={{ marginRight: "50px" }}>
      <TextField
        style={{ padding: "0" }}
        variant="outlined"
        label="Type Value"
        error={!!error}
        helperText={error}
        type="text"
        value={newTaskTitle}
        onChange={onChangeNewTastTitle}
        onKeyDown={onKeyDown}
      />
      <IconButton onClick={addTask} color="primary">
        <ControlPoint />
      </IconButton>
    </div>
  );
}

export default AddItemForm;
