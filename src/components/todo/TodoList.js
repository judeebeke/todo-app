import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "../UI/Modal";
import classes from "./TodoList.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";

const TodoList = (props) => {
    const [checked, setChecked] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState({
    editId: "",
    bool: false,
  });
  const [inputData, setInputData] = useState({
    title: "",
    desc: "",
  });

  const [removeDeleteBtn, setRemoveDeleteBtn] = useState("");

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const dismissDeleteModal = () => {
    setDeleteModal(false);
  };

  const checkboxHandler = (id) => {
    setChecked((prev) => {
      return !prev;
    });

    let checkStorage = JSON.parse(localStorage.getItem("ids")) || [];

    const check = checkStorage.includes(id);

    if (check) {
      let newIdStorage = checkStorage.filter((item) => {
        return item !== id;
      });

      if (newIdStorage.length > 1) {
        props.onGroupDeleteBtn(true, newIdStorage.length);
        setRemoveDeleteBtn(newIdStorage.length);
      } else {
        props.onGroupDeleteBtn(false);
        setRemoveDeleteBtn(0);
      }

      localStorage.setItem("ids", JSON.stringify(newIdStorage));
    } else {
      checkStorage.push(id);

      if (checkStorage.length > 1) {
        props.onGroupDeleteBtn(true, checkStorage.length);
        setRemoveDeleteBtn(checkStorage.length);
      } else {
        props.onGroupDeleteBtn(false);
        setRemoveDeleteBtn(0);
      }

      localStorage.setItem("ids", JSON.stringify(checkStorage));
    }
  };

  const showEditModalHandler = (id) => {
    let checkStorage = JSON.parse(localStorage.getItem("todo")) || [];

    setShowEditModal((prev) => {
      return { ...prev, bool: !prev.bool, editId: id };
    });

    let todoToEdit = checkStorage.filter((item) => {
      return item.id === id;
    });

    if (todoToEdit.length > 0) {
      const { title, desc } = todoToEdit[0];

      setInputData((prev) => {
        return { ...prev, title: title, desc: desc };
      });
    } else {
      setInputData((prev) => {
        return { ...prev, title: "", desc: "" };
      });
    }
  };

  const titleHandler = (event) => {
    setInputData((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const descHandler = (event) => {
    setInputData((prev) => {
      return { ...prev, desc: event.target.value };
    });
  };

  const edittedTodoHandler = (id) => {
    let checkStorage = JSON.parse(localStorage.getItem("todo")) || [];
    let checkIdStorage = JSON.parse(localStorage.getItem("ids")) || [];
    let updatedTodos;

    if (inputData.title.length < 1) {
      updatedTodos = checkStorage.filter((item) => {
        return item.id !== id;
      });

      let newIdStorage = checkIdStorage.filter((item) => {
        return item !== id;
      });

      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      localStorage.setItem("ids", JSON.stringify(newIdStorage));
    } else {
      let edittedTodo = checkStorage.findIndex((item) => {
        return item.id === id;
      });

      checkStorage[edittedTodo] = { ...inputData, id: id };

      updatedTodos = checkStorage;

      localStorage.setItem("todo", JSON.stringify(updatedTodos));
    }

    setShowEditModal((prev) => {
      return { ...prev, bool: !prev.bool, editId: id };
    });
  };

  return (
    <>
      <li className={`${classes.todoList} ${checked && classes.selected}`}>
        <span className={classes.todoListHeader}>
          <span className={classes.todoName}>
            <input
              onClick={() => {
                checkboxHandler(props.id);
              }}
              type="checkbox"
              className={`${classes.check} ${checked && classes.show}`}
              checked={checked}
            />
            <h4>{props.title}</h4>
          </span>
          <span className={classes.todoActions}>
            {removeDeleteBtn > 1 ? (
              ""
            ) : (
              <AiFillDelete
                onClick={showDeleteModal}
                className={`${classes.deleteBtn} ${checked && classes.show}`}
              />
            )}
            <AiFillEdit
              className={classes.editBtn}
              onClick={() => {
                showEditModalHandler(props.id);
              }}
            />
          </span>
        </span>
        <p>{props.desc}</p>
      </li>

      {deleteModal && (
        <Modal onShow={dismissDeleteModal}>
          <div className={classes.modalElement}>
            <h3>Are you sure you want to delete?</h3>
            <span className={classes.modalBtn}>
              <Button style={classes.falseBtn} onShow={dismissDeleteModal}>
                No
              </Button>
              <Button
                style={classes.trueBtn}
                onShow={() => {
                  props.onDelete(props.id);
                }}
                onChange={dismissDeleteModal}
              >
                Yes
              </Button>
            </span>
          </div>
        </Modal>
      )}

      {showEditModal.bool && (
        <Modal onShow={showEditModalHandler}>
          <div className={classes.modalElement}>
            <Input
              onType={titleHandler}
              type={"text"}
              style={classes.title}
              placeholder={"Edit todo title here..."}
              value={inputData.title}
            />
            <textarea
              onChange={descHandler}
              placeholder={"Enter todo details here..."}
              name="todoDescription"
              rows="3"
              cols="50"
              value={inputData.desc}
            ></textarea>
            <span className={classes.modalBtn}>
              <Button style={classes.falseBtn} onShow={showEditModalHandler}>
                No
              </Button>
              <Button
                style={classes.trueBtn}
                onShow={() => {
                  edittedTodoHandler(showEditModal.editId);
                }}
              >
                Submit
              </Button>
            </span>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TodoList;
