import { useEffect, useRef, useState } from "react";
import "../App.css";
import ErrorMesseage from "./ErrorMesseage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdNoteAdd, MdTaskAlt } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";
import app from "../FirebaseConfig";
import { MdOutlineBrowserUpdated } from "react-icons/md";
// import Headers from "./Headers";
const Container = () => {
  const [inputdata, setinputdata] = useState("");
  const [dataArray, setdataArray] = useState([]);
  const [editing, setediting] = useState(null);
  const [isEditing, setisEditing] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);

  const AddButtonHandler = async () => {
    if (isEditing) {
      updatehandler();
      return;
    }

    const db = getDatabase(app);
    const newdocref = push(ref(db, "Todo/TodoList"));
    const newtask = {
      name: inputdata,
    };
    set(newdocref, newtask)
      .then(() => {
        toast.success("data added successfully");
        setdataArray((prev) => [...prev, { key: newdocref.key, ...newtask }]);
        setinputdata("");
      })
      .catch((error) => {
        toast.error("error", error.message);
      });
  };
  const fetchdata = async () => {
    const db = getDatabase(app);
    const dbref = ref(db, "Todo/TodoList");
    const snapshot = await get(dbref);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setdataArray(
        Object.entries(data).map(([key, value]) => ({ key, ...value }))
      );
    } else {
      toast.error("error");
    }
  };
  const editbtn = (id, name) => {
    console.log(id, name);
    setediting({ key: id, name: name });
    setinputdata(name);
    setisEditing(true);
  };
  const updatehandler = async () => {
    const db = getDatabase(app);
    const taskref = ref(db, `Todo/TodoList${editing.key}`);
    set(taskref, { name: inputdata })
      .then(() => {
        setdataArray((prev) =>
          prev.map((task) =>
            task.key === editing.key ? { key: task.key, name: inputdata } : task
          )
        );
        toast.success("data updated successfully");
        setisEditing(false);
        setediting(null);
        setinputdata("");
      })
      .catch((error) => {
        toast.error("error", error.message);
      });
  };

  const deletebtn = async (id) => {
    const db = getDatabase(app);
    const taskref = ref(db, `Todo/TodoList/${id}`);
    remove(taskref)
      .then(() => {
        toast.warning("Data deleted successfully");
        setdataArray((prev) => prev.filter((task) => task.key !== id));
      })
      .catch((error) => {
        toast.error("error", error.message);
      });
  };

  const radionbtn = (key) => {
    console.log("radio button clicked");
    const updatetodo = dataArray.map((item) => {
      if (item.key === key) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    console.log(key);

    setdataArray(updatetodo);
  };

  return (
    <>
      <div className="heading">
        <h2>Save Your items here!</h2>
      </div>

      <div className="Top_Container">
        <input
          className="inputfiled"
          type="text"
          required
          placeholder="Enter your task"
          value={inputdata}
          onChange={(e) => setinputdata(e.target.value)}
          dir="ltr" 
        />
        {isEditing ? (
          <button className="Add" onClick={updatehandler}>
            <MdOutlineBrowserUpdated />
          </button>
        ) : (
          <button onClick={AddButtonHandler} className="Add">
            <MdNoteAdd />
          </button>
        )}
      </div>

      <div className="last_Container">
        <h1>Lists</h1>
        <hr />
        {dataArray.length === 0 && <ErrorMesseage />}
        {dataArray.map((todos) => (
          <div className="lists" key={todos.key}>
            <div
              style={{
                textDecoration: todos.completed ? "line-through" : "none",
                color: todos.completed ? "lightgray" : "black",
              }}
              className="info"
            >
              <input
                onChange={() => radionbtn(todos.key)}
                className="radiobtn"
                type="radio"
              />
              <h2>{todos.name}</h2>
            </div>
            {/* <h2>{todayDate.toLocaleDateString()}</h2> */}
            <div className="btns">
              <button onClick={() => editbtn(todos.key, todos.name)}>
                <MdOutlineEditNote />
              </button>
              <button onClick={() => deletebtn(todos.key)}>
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Container;
