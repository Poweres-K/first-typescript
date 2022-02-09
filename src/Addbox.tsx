import React, { useState } from "react";
import { Action } from "./reducer";

interface Addboxrops {
  dispatch: React.Dispatch<Action>;
}

const Addbox = ({ dispatch }: Addboxrops) => {
  const [newTodo, setNewTodo] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD_TO_DO", payload: newTodo });
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTodo} onChange={handleChange} />
    </form>
  );
};

export default Addbox;
