import { TextField } from "@material-ui/core";
import { useState, ChangeEvent } from "react";

type EditableStapType = {
  title: string;
  onChange: (newTitle: string) => void;
};

function EditableSpan(props: EditableStapType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      size="small"
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <>
      <span onDoubleClick={activateEditMode}>{props.title}</span>
    </>
  );
}

export default EditableSpan;
