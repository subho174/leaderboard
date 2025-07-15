import { Skeleton } from "./ui/skeleton";

export default function LeaderboardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 rounded-md bg-gray-100 dark:bg-gray-400"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-7 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Skeleton className="h-5 w-40 md:w-80 rounded bg-gray-300 dark:bg-gray-600" />
          </div>

          <Skeleton className="h-5 w-16 rounded bg-gray-300 dark:bg-gray-600" />
        </div>
      ))}
    </div>
  );
}
