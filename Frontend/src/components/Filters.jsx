import { TASK_PRIORITY, TASK_STATUS } from "../types/task";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <select
        className="border p-2 rounded"
        value={filters.status}
        onChange={(e) =>
          setFilters((f) => ({ ...f, status: e.target.value }))
        }
      >
        <option value="">All Status</option>
        {TASK_STATUS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={filters.priority}
        onChange={(e) =>
          setFilters((f) => ({ ...f, priority: e.target.value }))
        }
      >
        <option value="">All Priority</option>
        {TASK_PRIORITY.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={filters.sort}
        onChange={(e) =>
          setFilters((f) => ({ ...f, sort: e.target.value }))
        }
      >
        <option value="">Sort By</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
