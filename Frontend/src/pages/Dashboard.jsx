import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/task.api";
import { useAuth } from "../hooks/useAuth";
import TaskCard from "../components/TaskCard";
import TaskSkeleton from "../components/TaskSkeleton";

export default function Dashboard() {
  const { data: user } = useAuth();

  const {
    data: tasks = [],
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2].map((i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  const assignedToMe = tasks.filter(
    (t) => t.assignedToId?._id === user?._id
  );

  const createdByMe = tasks.filter(
    (t) => t.creatorId === user?._id
  );

  const overdueTasks = tasks.filter(
    (t) =>
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED"
  );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Assigned to Me */}
      <section>
        <h3 className="text-lg font-semibold mb-2">
          Assigned to Me
        </h3>
        {assignedToMe.length === 0 ? (
          <p className="text-gray-500">No tasks assigned</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {assignedToMe.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </section>

      {/* Created by Me */}
      <section>
        <h3 className="text-lg font-semibold mb-2">
          Created by Me
        </h3>
        {createdByMe.length === 0 ? (
          <p className="text-gray-500">No tasks created</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {createdByMe.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </section>

      {/* Overdue */}
      <section>
        <h3 className="text-lg font-semibold mb-2 text-red-600">
          Overdue Tasks
        </h3>
        {overdueTasks.length === 0 ? (
          <p className="text-gray-500">No overdue tasks 🎉</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {overdueTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
