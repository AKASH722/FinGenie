import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function TransactionsSkeleton() {
  return (
    (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-36 ml-auto" />
          <Skeleton className="h-10 w-10" />
        </div>

        <div className="rounded-md border">
          <div className="h-10 border-b px-4 flex items-center">
            <Skeleton className="h-4 w-full" />
          </div>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="h-16 border-b px-4 flex items-center">
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-28" />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>)
  )
}

