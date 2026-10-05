import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studentTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        task: task,
        completed: false
      }
    ]);

    setTask("");
  };

  const completeTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Student To-Do List</h1>

      <input
        placeholder="Enter study task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      {tasks.map((item, index) => (
        <div className="task" key={index}>
          <span
            className={item.completed ? "completed" : ""}
          >
            {item.task}
          </span>

          <div>
            <button onClick={() => completeTask(index)}>
              {item.completed ? "Undo" : "Done"}
            </button>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
