import React, { useState } from "react";
import { saveAs } from "file-saver";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [exportList, setExportList] = useState([]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      taskNumber: newNumber,
    };
    setTodoList([...todoList, task]);
  };

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
  };

  const exportTask = () => {
    // Filter out tasks from todoList that are not already in exportList
    const tasksToExport = todoList.filter(
      (task) => !exportList.some((exportedTask) => exportedTask.id === task.id)
    );

    if (tasksToExport.length === 0) {
      alert("No new data!");
    } else {
      alert("Export was successful!");
    }

    // Add only new tasks to the export list
    setExportList([...exportList, ...tasksToExport]);
  };

  const emptyExport = () => {
    setExportList([]);
  };

  const exportToText = () => {
    if (exportList.length === 0) {
      alert("There is no data to extract");
    } else {
      const exportData = exportList
        .map(
          (task) =>
            `Customer Name: ${task.taskName}, Customer Number: ${task.taskNumber}`
        )
        .join("\n");
      const blob = new Blob([exportData], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "exported_data.txt");
    }
  };

  const deleteAll = () => {
    setTodoList([]);
  };

  return (
    <div className="App">
      <div className="stuff">
        <div>
          <h1 className="projectHeader">Customer Info Tracker</h1>
        </div>
        <div className="addTask">
          <div className="infoFields">
            <div className="info">
              <h2>Customer Name:</h2>{" "}
              <input onChange={handleChange} className="taskInput" />
            </div>
            <div className="info">
              <h2>Customer Number:</h2>
              <input
                type="number"
                onChange={handleNumber}
                className="numberInput"
              />
            </div>
            <button onClick={addTask}>Add Customer</button>
            {todoList.length >= 1 && (
              <button className="exportButton" onClick={exportTask}>
                Export
              </button>
            )}
            {todoList.length !== 0 && (
              <button className="deleteAll" onClick={deleteAll}>
                Delete All
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="taskList">
        {todoList.map((task) => (
          <div className="taskItem" key={task.id}>
            <p className="taskName">
              <span className="expNumber">Customer Name:</span> {task.taskName}
            </p>
            {task.taskNumber.length === 0 ? (
              <p className="taskNumber">
                <span className="expNumber">Customer Number:</span>{" "}
                <span style={{ color: "red" }}>None</span>
              </p>
            ) : (
              <p className="taskNumber">
                <span className="expNumber">Customer Number:</span>
                <span style={{ color: "green" }}>{task.taskNumber}</span>
              </p>
            )}
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="otherStuff">
        <div className="exportList">
          <div className="exportSection">
            <h1 className="exportHeader">Export List</h1>
            {exportList.length >= 1 && (
              <button className="extractButton" onClick={exportToText}>
                Extract Info
              </button>
            )}
            {exportList.length >= 1 && (
              <button className="emptyButton" onClick={emptyExport}>
                Clear
              </button>
            )}
          </div>
        </div>
        {exportList.map((task) => (
          <div className="exportItem" key={task.id}>
            <p className="exportName">
              <span className="expNumber">Customer Number:</span>{" "}
              <span>{task.taskName}</span>
            </p>
            {task.taskNumber.length === 0 ? (
              <p className="exportNumber">
                <span className="expNumber">Customer Number:</span>
                <span style={{ color: "red" }}>None</span>
              </p>
            ) : (
              <p className="exportNumber">
                <span className="expNumber">Customer Number:</span>
                <span style={{ color: "green" }}>{task.taskNumber}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
