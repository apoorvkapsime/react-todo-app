import React, { useState, useEffect } from "react";
import "./style.css";

const getItem = () => {
  const list = localStorage.getItem("mytodolist");
  if (list) return JSON.parse(list);
  else return [];
};

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getItem());
  const [isEditItem, setisEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  //how to add item
  const addItem = () => {
    if (!inputData) alert("please enter the item");
    else if (inputData && toggleButton) {
      setItem(
        item.map((curElem) => {
          if (curElem.id === isEditItem) {
            console.log(curElem);
            // return (curElem.name = inputData);
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setToggleButton(false);
      setInputData("");
      setisEditItem(null);
    } else {
      const myInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItem([...item, myInputData]);
      setInputData("");
    }
  };
  //how to edit item
  const editItems = (index) => {
    const itemFound = item.find((curElem) => {
      return curElem.id === index;
    });
    setToggleButton(true);
    setInputData(itemFound.name);
    setisEditItem(index);
  };

  //how to deleteItem
  const deleteItem = (index) => {
    const updatedItem = item.filter((curElem) => {
      return curElem.id !== index;
    });
    setItem(updatedItem);
  };
  const removeAll = () => {
    setItem([]);
  };
  //   store the data on localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />

            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show our Items */}
          {item.map((curElem) => {
            return (
              <div className="showItems" key={curElem.id}>
                <div className="eachItem">
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItems(curElem.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(curElem.id);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Remove all btn  */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove now"
              onClick={() => {
                removeAll();
              }}
            >
              <span> Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
