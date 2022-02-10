import React, { useState, useRef, useEffect } from "react";
import { toDo } from "./type";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
interface SingleToDoProps {
  index: number;
  toDo: toDo;
  handleEdit: (editMsg: string, id: number, groupName: string) => void;
  handleDelete: (id: number, groupName: string) => void;
  handleToggleComplete: (id: number, groupName: string) => void;
  groupName: string;
}

interface SingleToDoState {
  action: string;
  isEdit: boolean;
}

const SingleToDo: React.FC<SingleToDoProps> = ({
  index,
  toDo,
  groupName,
  handleEdit,
  handleDelete,
  handleToggleComplete,
}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const { id, action } = toDo;
  const [thisToDo, setThisToDo] = useState<SingleToDoState>({
    action,
    isEdit: false,
  });

  const handelSubmitEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleEdit(thisToDo.action, id, groupName);
    setThisToDo({ ...thisToDo, isEdit: false });
  };

  useEffect(() => {
    if (thisToDo.isEdit) {
      inputEl?.current?.focus();
    }
  }, [thisToDo.isEdit]);

  if (thisToDo.isEdit) {
    return (
      <Wrapper>
        <form onSubmit={handelSubmitEdit}>
          <input
            ref={inputEl}
            type="text"
            value={thisToDo.action}
            onChange={(e) =>
              setThisToDo({ ...thisToDo, action: e.target.value })
            }
          />
          <button>
            <AiOutlineEdit />
          </button>
        </form>
      </Wrapper>
    );
  }
  return (
    <Draggable draggableId={toDo.id.toString()} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo.isComplete ? (
            <s>{thisToDo.action}</s>
          ) : (
            <p>{thisToDo.action}</p>
          )}

          <div className="button-group">
            <button onClick={() => setThisToDo({ ...thisToDo, isEdit: true })}>
              <AiOutlineEdit />
            </button>
            <button onClick={() => handleDelete(id, groupName)}>
              <BsTrash />
            </button>
            <button onClick={() => handleToggleComplete(id, groupName)}>
              <AiOutlineCheck />
            </button>
          </div>
        </Wrapper>
      )}
    </Draggable>
  );
};

const Wrapper = styled.li`
  background-color: rgba(255, 255, 128, 0.5);
  border-radius: 15px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  .button-group {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
  }
  button {
    margin-left: 20px;
    height: 100%;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
    transform: scale(1.7);
  }
  p,
  s {
    width: 70%;
    padding-left: 10px;
    text-align: left;
    font-size: 1.2em;
  }
  form {
    display: flex;
    width: 100%;
    align-items: center;
    align-self: center;
    justify-content: space-evenly;
    input {
      width: 70%;
      font-size: 1.2em;
    }
    button {
      height: 100%;
    }
  }
`;

export default SingleToDo;
