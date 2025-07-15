import { Card, CardContent } from "./ui/card";
import type { IUser } from "../../../server/src/model/user.model";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

export default function Leaderboard({
  isLoading,
  users,
}: {
  isLoading: boolean;
  users: IUser[];
}) {
  // assigning medals to top rankers
  const getMedal = (index: number) => {
    return ["🥇", "🥈", "🥉"][index] || null;
  };

  // assigning specific bg color to top rankers
  const getRankColor = (index: number) => {
    return (
      [
        "bg-yellow-100 text-yellow-800",
        "bg-gray-100 text-gray-800",
        "bg-orange-100 text-orange-800",
      ][index] || "bg-muted text-muted-foreground"
    );
  };

  // using pagination logic
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.ceil(users.length / pageSize);

  const paginatedUsers = users.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  return (
    <Card className="w-full border-1 mt-12 mb-4 border-gray-200 shadow-2xs hover:shadow-lg hover:-translate-y-2 duration-500 max-w-2xl mx-auto">
      <CardContent className="px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">🏆 Leaderboard</h2>
        <div className="space-y-4">
          {isLoading && users.length == 0 ? (
            <LeaderboardSkeleton />
          ) : (
            paginatedUsers.map((user, i) => {
              const index = page * pageSize + i;

              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md",
                    getRankColor(index)
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        getMedal(index) ? "text-2xl" : "text-lg mx-2"
                      }`}
                    >
                      {getMedal(index) || `#${index + 1}`}
                    </div>
                    <span className="font-medium w-40 truncate md:w-80">
                      {user.name}
                    </span>
                  </div>
                  <span className="font-semibold">{user.totalPoints} pts</span>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <ArrowLeft />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="custom"
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
