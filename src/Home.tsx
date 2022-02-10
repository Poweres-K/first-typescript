import React, { useReducer } from "react";
import { init } from "./type";
import { reducer } from "./reducer";
import Addbox from "./Addbox";
import SingleToDo from "./SingleToDo";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
const initialState: init = {
  toDoList: [],
  completeToDo: [],
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEdit = (editMsg: string, id: number, groupName: string) => {
    dispatch({ type: "EDIT", payload: { id, editMsg, groupName } });
  };

  const handleDelete = (id: number, groupName: string) => {
    dispatch({ type: "DELETE", payload: { id, groupName } });
  };

  const handleOnDragEnd = (result: DropResult) => {
    dispatch({ type: "CHANGE_POSITION", payload: result });
  };

  const handleToggleComplete = (id: number, groupName: string) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: { id, groupName } });
  };

  return (
    <div className="main">
      <Addbox dispatch={dispatch} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Wrapper className="test">
          <div className="todo">
            <div className="header">
              <h2>TO DO</h2>
            </div>
            <Droppable droppableId="toDoList">
              {(provided) => (
                <ul
                  className="toDoList"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state.toDoList?.map((toDo, index) => {
                    return (
                      <SingleToDo
                        toDo={toDo}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleToggleComplete={handleToggleComplete}
                        index={index}
                        key={toDo.id}
                        groupName="toDoList"
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="complete">
            <div className="header">
              <h2>COMPLETE</h2>
            </div>
            <Droppable droppableId="completeToDo">
              {(provided) => (
                <ul
                  className="completeToDo"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state.completeToDo?.map((toDo, index) => {
                    return (
                      <SingleToDo
                        toDo={toDo}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        index={index}
                        key={toDo.id}
                        handleToggleComplete={handleToggleComplete}
                        groupName="completeToDo"
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </Wrapper>
      </DragDropContext>
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  witdth: 100%;
  display: flex;
  flex-direction: row;
  .todo {
    .header {
      color: #619c54;
    }

    min-width: 50%;
    min-height: 40px;
    border-radius: 25px;
  }
  .complete {
    .header {
      color: #d45f6b;
    }
    min-width: 50%;
    min-height: 40px;
    border-radius: 25px;
  }
  .toDoList,
  .completeToDo {
    display: flex;
    flex-direction: column;
    padding: 2em;
    border-radius: 25px;
    width: 90%;
  }

  .toDoList {
    background-color: #619c54;
  }

  .completeToDo {
    background-color: #d45f6b;
  }
`;

export default Home;
