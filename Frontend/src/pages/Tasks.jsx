import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { fetchTasks, updateTask } from "../api/task.api";
import { useSocket } from "../hooks/useSocket";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import TaskSkeleton from "../components/TaskSkeleton";

export default function Tasks() {
  useSocket();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sort: "",
  });

  // 📡 Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // ⚡ OPTIMISTIC UPDATE MUTATION (THIS IS YOUR CODE)
  const updateMutation = useMutation({
    mutationFn: updateTask,

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["tasks"]);

      const prev = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) =>
          t._id === id ? { ...t, ...data } : t
        )
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["tasks"], ctx.prev);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // 🔄 Filter + sort
  let filteredTasks = [...tasks];

  if (filters.status) {
    filteredTasks = filteredTasks.filter(
      (t) => t.status === filters.status
    );
  }

  if (filters.priority) {
    filteredTasks = filteredTasks.filter(
      (t) => t.priority === filters.priority
    );
  }

  if (filters.sort === "dueDate") {
    filteredTasks.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load tasks</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      <TaskForm />
      <Filters filters={filters} setFilters={setFilters} />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 mt-4">No tasks found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={(status) =>
                updateMutation.mutate({
                  id: task._id,
                  data: { status },
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
