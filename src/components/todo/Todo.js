import { useState, useEffect, useReducer } from "react";
// import {AiFillDelete} from 'react-icons/ai';
import Input from "../UI/Input";
import TodoList from "./TodoList";
import Button from "../UI/Button";
import classes from "./Todo.module.css";
import Modal from "./../UI/Modal";

const deleteReducer = [];

const deleteDispatReducer = (state, action) => {
  if (action.type === "DELETE") {
    let checkStorage = JSON.parse(localStorage.getItem("todo"));

    const newTodo = checkStorage.filter((item) => {
      return item.id !== action.id;
    });

    let updatedTodos = newTodo;

    localStorage.setItem("todo", JSON.stringify(newTodo));

    return updatedTodos;
  }

  if (action.type === "GROUP-DELETE") {
    let checkIdStorage = JSON.parse(localStorage.getItem("ids")) || [];

    for (let id of checkIdStorage) {
      let checkStorage = JSON.parse(localStorage.getItem("todo"));

      let newTodo = checkStorage.filter((item) => {
        return item.id !== id;
      });

      localStorage.setItem("todo", JSON.stringify(newTodo));
    }

    checkIdStorage = [];

    localStorage.setItem("ids", JSON.stringify(checkIdStorage));

    let updatedTodos = JSON.parse(localStorage.getItem("todo"));

    return updatedTodos;
  }

  return state;
};
// TODO COMPONENT
const Todo = () => {
  const [inputData, setInputData] = useState({
    title: "",
    desc: "",
  });

  const [inputError, setInputError] = useState("");

  const [groupDeleteBtn, setGroupDeleteBtn] = useState({
    idsLength: 0,
    bool: false,
  });

  const [groupDeleteModal, setGroupDeleteModal] = useState(false);

  const [newTodoState, deleteDispatchFunction] = useReducer(
    deleteDispatReducer,
    deleteReducer
  );

  let checkStorage = JSON.parse(localStorage.getItem("todo")) || [];

  const [totalTodo, setTotalTodo] = useState(checkStorage);

  const deleteHandler = (id) => {
    let checkIdStorage = JSON.parse(localStorage.getItem("ids")) || [];

    deleteDispatchFunction({ type: "DELETE", id: id });

    const groupDeleteId = checkIdStorage.filter((item) => {
      return item !== id;
    });

    localStorage.setItem("ids", JSON.stringify(groupDeleteId));

    if (groupDeleteId.length > 1) {
      setGroupDeleteBtn((prev) => {
        return { ...prev, idsLength: groupDeleteId.length, bool: true };
      });
    } else {
      setGroupDeleteBtn((prev) => {
        return { ...prev, bool: false };
      });
    }
  };

  const groupDeleteHandler = () => {
    deleteDispatchFunction({ type: "GROUP-DELETE" });

    setGroupDeleteBtn((prev) => {
      return { ...prev, bool: false };
    });

    setGroupDeleteModal((prev) => {
      return !prev;
    });
  };

  const groupDeleteBtnHandler = (bool, idsLength) => {
    setGroupDeleteBtn((prev) => {
      return { ...prev, idsLength, bool };
    });
  };

  const groupDeleteModalHandler = () => {
    setGroupDeleteModal((prev) => {
      return !prev;
    });
  };

  const titleHandler = (event) => {
    setInputError("");
    setInputData((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const descHandler = (event) => {
    setInputData((prev) => {
      return { ...prev, desc: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let todoTitle = event.target[0].value;
    let todoDesc = event.target[1].value;

    if (todoTitle.length < 1) {
      return setInputError("Please enter a Todo Title");
    } else {
      const getData = {
        id: Math.random().toFixed(3),
        title: todoTitle,
        desc: todoDesc,
      };

      setTotalTodo((prev) => {
        return [...prev, getData];
      });

      let checkStorage = JSON.parse(localStorage.getItem("todo")) || [];

      checkStorage.unshift(getData);

      localStorage.setItem("todo", JSON.stringify(checkStorage));

      setInputData({
        title: "",
        desc: "",
      });
    }
  };

  useEffect(() => {
    let checkStorage = JSON.parse(localStorage.getItem("todo")) || [];

    checkStorage.length >= 1 && setTotalTodo(checkStorage);
  }, [totalTodo, inputData]);

  useEffect(() => {
    setTotalTodo(newTodoState);
  }, [newTodoState]);

  return (
    <div className={classes.todo}>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor={"title"} className={classes.title}>
          Todo Title
        </label>
        <Input
          onType={titleHandler}
          type={"text"}
          id={"title"}
          value={inputData.title}
          placeholder={"Enter todo title here..."}
        />
        <label htmlFor="description" />
        <textarea
          onChange={descHandler}
          id="description"
          placeholder={"Enter todo details here..."}
          name="todoDescription"
          rows="3"
          cols="50"
          value={inputData.desc}
        ></textarea>
        <span className={classes.btnCont}>
          <Button type={"submit"} style={classes.btn}>
            Task
          </Button>
        </span>
      </form>

      <p>{inputError}</p>

      {groupDeleteBtn.bool && (
        <Button style={classes.groupDeleteBtn} onShow={groupDeleteModalHandler}>
          <h5>{groupDeleteBtn.idsLength} DELETE</h5>
        </Button>
      )}

      {/* Todo List Putput  */}
      <ul className={classes.todos}>
        {totalTodo.length < 1 && (
          <li className={classes.noTodo}>No Item Todo</li>
        )}
        {totalTodo.length > 0 &&
          totalTodo.map((item) => {
            return (
              <TodoList
                key={item.id}
                onGroupDeleteBtn={groupDeleteBtnHandler}
                id={item.id}
                title={item.title}
                desc={item.desc}
                onDelete={deleteHandler}
              />
            );
          })}
      </ul>

      {/* Grouped Delete Modal */}
      {groupDeleteModal && (
        <Modal onShow={groupDeleteModalHandler}>
          <div className={classes.modalElement}>
            <h3>Are you sure you want to delete?</h3>
            <span className={classes.modalBtn}>
              <Button style={classes.falseBtn} onShow={groupDeleteModalHandler}>
                No
              </Button>
              <Button style={classes.trueBtn} onShow={groupDeleteHandler}>
                Yes
              </Button>
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Todo;
