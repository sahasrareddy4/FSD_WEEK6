import React, { useState, useEffect } from "react";

function App() {
  const [employee, setEmployee] = useState("");
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("employeeTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("employeeTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (employee.trim() === "" || task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        employee: employee,
        task: task
      }
    ]);

    setEmployee("");
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Manager To-Do List</h1>

      <input
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />

      <input
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Assign Task</button>

      {tasks.map((item, index) => (
        <div className="task" key={index}>
          <div>
            <h3>{item.employee}</h3>
            <p>{item.task}</p>
          </div>

          <button onClick={() => deleteTask(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
