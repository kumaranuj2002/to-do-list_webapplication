export default function TaskItem({ task, onDelete, onUpdate }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <button onClick={() => onUpdate(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}
