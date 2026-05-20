import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const response = await axios.get("http://localhost:3001/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post("http://localhost:3001/tasks", {
      title,
      priority: "medium"
    });

    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    loadTasks();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>AI Task Tracker</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px"
          }}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} ({task.priority})

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;