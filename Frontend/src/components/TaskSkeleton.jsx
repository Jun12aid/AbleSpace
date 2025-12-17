export default function TaskSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse bg-gray-100">
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
