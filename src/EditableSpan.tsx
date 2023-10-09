import { useState, ChangeEvent } from "react";

type EditableStapType = {
  children: React.ReactNode;
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
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <>
      {props.children}
      <span onDoubleClick={activateEditMode}>{props.title}</span>
    </>
  );
}

export default EditableSpan;
