import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createTask } from "../api/task.api";
import { fetchUsers } from "../api/user.api";

const schema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  dueDate: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assignedToId: z.string().min(1),
});

export default function TaskForm() {
  const queryClient = useQueryClient();

  // 🔹 fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <h3 className="font-bold mb-3">Create Task</h3>

      <input {...register("title")} placeholder="Title" className="input" />
      <textarea {...register("description")} placeholder="Description" className="input" />
      <input type="date" {...register("dueDate")} className="input" />

      <select {...register("priority")} className="input">
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      {/* 🔴 ASSIGNEE DROPDOWN */}
      <select {...register("assignedToId")} className="input">
        <option value="">Select Assignee</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <button className="btn mt-2" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Creating..." : "Create Task"}
      </button>

      {formState.errors.assignedToId && (
        <p className="text-red-500 text-sm">
          Please select an assignee
        </p>
      )}
    </form>
  );
}
