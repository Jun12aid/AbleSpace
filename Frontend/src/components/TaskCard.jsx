export default function TaskCard({ task }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span className="text-xs px-2 py-1 rounded bg-gray-200">
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {task.description}
      </p>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>Status: {task.status}</span>
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
