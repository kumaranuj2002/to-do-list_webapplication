import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask }) {
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const change = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: "", description: "" });
  };

  return (
    <form onSubmit={submit} className="task-form">
      <input
        name="title"
        placeholder="Task title"
        onChange={change}
        value={task.title}
      />
      <input
        name="description"
        placeholder="Description"
        onChange={change}
        value={task.description}
      />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}
