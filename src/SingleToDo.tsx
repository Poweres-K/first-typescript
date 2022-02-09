import React, { useState } from "react";
import { toDo } from "./type";
import styled from "styled-components";

interface SingleToDoProps {
  toDo: toDo;
  handleEdit: (editMsg: string, id: number) => void;
  handleDelete: (id: number) => void;
}

interface SingleToDoState {
  action: string;
  isEdit: boolean;
  isComplete: boolean;
}

const SingleToDo: React.FC<SingleToDoProps> = ({
  toDo,
  handleEdit,
  handleDelete,
}) => {
  const { id, action } = toDo;
  const [thisToDo, setThisToDo] = useState<SingleToDoState>({
    action,
    isEdit: false,
    isComplete: false,
  });

  const handelSubmitEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleEdit(thisToDo.action, id);
    setThisToDo({ ...thisToDo, isEdit: false });
  };

  const handleComplete = () => {
    setThisToDo({ ...thisToDo, isComplete: !thisToDo.isComplete });
  };

  if (thisToDo.isEdit) {
    return (
      <Wrapper>
        <form onSubmit={handelSubmitEdit}>
          <input
            type="text"
            value={thisToDo.action}
            onChange={(e) =>
              setThisToDo({ ...thisToDo, action: e.target.value })
            }
          />
          <button>Submit Change</button>
        </form>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {thisToDo.isComplete ? (
        <s>{thisToDo.action}</s>
      ) : (
        <p>{thisToDo.action}</p>
      )}

      <div className="button-group">
        <button onClick={() => setThisToDo({ ...thisToDo, isEdit: true })}>
          Edit
        </button>
        <button onClick={() => handleDelete(id)}>delete</button>
        <button onClick={handleComplete}>
          {thisToDo.isComplete ? "Todo" : "Complete"}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px black solid;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  p,
  s {
    width: 60%;
    text-align: left;
  }
  form {
    display: flex;
    width: 100%;
    input {
      width: 60%;
    }
    button {
      width: 30%;
    }
  }
`;

export default SingleToDo;
