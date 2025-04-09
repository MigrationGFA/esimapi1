import { Skeleton } from "@/components/ui/skeleton";

export default function HistorySkeleton() {
  return (
    <div className="space-y-3 mt-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-5 w-16 ml-auto" />
              <Skeleton className="h-4 w-12 ml-auto" />
              <Skeleton className="h-3 w-20 ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
