import React, { useReducer } from "react";
import { init } from "./type";
import { reducer } from "./reducer";
import Addbox from "./Addbox";
import SingleToDo from "./SingleToDo";
import styled from "styled-components";
const initialState: init = {
  toDoList: [],
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEdit = (editMsg: string, id: number) => {
    dispatch({ type: "EDIT", payload: { id, editMsg } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <div className="main">
      <Addbox dispatch={dispatch} />
      <SingleWrapper>
        {state.toDoList.map((toDo) => {
          return (
            <SingleToDo
              key={toDo.id}
              toDo={toDo}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </SingleWrapper>
    </div>
  );
};

const SingleWrapper = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  row-gap: 1rem;
`;

export default Home;
