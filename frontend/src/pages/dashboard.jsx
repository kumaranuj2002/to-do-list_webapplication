import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createOrUpdateTask = async (task) => {
    if (task._id) {
      await API.put(`/tasks/${task._id}`, task);
    } else {
      await API.post("/tasks", task);
    }
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="dash-container">
      <h1>Your Tasks</h1>
      <button onClick={logout}>Logout</button>

      <TaskForm
        onSubmit={createOrUpdateTask}
        editingTask={editingTask}
      />

      <div className="task-list">
        {tasks.map((t) => (
          <TaskItem
            key={t._id}
            task={t}
            onDelete={deleteTask}
            onUpdate={setEditingTask}
          />
        ))}
      </div>
    </div>
  );
}
