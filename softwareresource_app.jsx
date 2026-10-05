import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [resource, setResource] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("softwareTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("softwareTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "" || resource.trim() === "") return;

    setTasks([
      ...tasks,
      {
        task: task,
        resource: resource
      }
    ]);

    setTask("");
    setResource("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Software Resource Allocation</h1>

      <input
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        placeholder="Enter resource/tool"
        value={resource}
        onChange={(e) => setResource(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <div>
        {tasks.map((item, index) => (
          <div className="task" key={index}>
            <div>
              <b>{item.task}</b>
              <p>Resource: {item.resource}</p>
            </div>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
