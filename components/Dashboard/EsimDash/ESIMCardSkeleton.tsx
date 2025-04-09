import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ESIMCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="w-full max-w-md  rounded-lg overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="flex p-4 items-center justify-between border-b-2">
              <div className="flex items-center">
                <Skeleton className="w-12 h-12 mr-3 rounded-md" />
                <Skeleton className="h-6 w-32" />
              </div>

              <Skeleton className="w-16 h-6" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 p-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-2 px-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-full rounded-xl" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>

            <div className="p-4">
              <Skeleton className="w-full h-10 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
