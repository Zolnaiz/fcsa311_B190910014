const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: Date.now(),
    title: req.body.title,
    priority: req.body.priority || "medium",
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.priority = req.body.priority || task.priority;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});