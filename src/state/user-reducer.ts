type StateType = {
  age: number;
  name: string;
  childrenCount: number;
};

type ActionType = {
  type: string;
  [key: string]: any;
};

export const userReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "INCREMENT-AGE":
      return {
        ...state,
        age: state.age + 1,
      };
    case "INCREMENT-CHILD-COUNT":
      return {
        ...state,
        childrenCount: state.childrenCount + 1,
      };
    case "CHANGE-NAME":
      return {
        ...state,
        name: action.newName,
      };
    default:
      throw new Error("I dont know this action type");
  }
};
