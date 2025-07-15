import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import type { IUser } from "../../../server/src/types/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import API from "../lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ClaimPoints({
  users,
  setUsers,
  selectedUser,
  setSelectedUser,
}: {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  selectedUser: string;
  setSelectedUser: Dispatch<SetStateAction<string>>;
}) {
  const [isLoading, setisLoading] = useState(false);

  // claming points for a specific user with user id
  const claimPoints = () => {
    setisLoading(true);
    API.post("/claim-points", { userId: selectedUser })
      .then((res) => {
        console.log(res);

        // updating ranks after successful claim of points
        const updateRanks = [...users];
        updateRanks.forEach((user) => {
          if (user._id?.toString() === selectedUser)
            user.totalPoints = res.data.data.totalPoints; // increasing totalPoints of that user in ui
        });

        // sorting users by total points in descending order to assign ranks to them
        updateRanks.sort(
          (user1, user2) =>
            Number(user2.totalPoints) - Number(user1.totalPoints)
        );
        setUsers(updateRanks); // updating users list
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data.errMessage);
      })
      .finally(() => setisLoading(false));
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold my-5">Claim points</h1>
      <div className="flex gap-6">
        <Select onValueChange={setSelectedUser} value={selectedUser}>
          <SelectTrigger className="min-w-40">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user, i) => (
              <SelectItem key={i} value={user._id!.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="custom"
          onClick={claimPoints}
          disabled={isLoading}
          className="w-18"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Claim"}
        </Button>
      </div>
    </section>
  );
}
