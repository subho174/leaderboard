import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import API from "../lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { IUser } from "../../../server/src/model/user.model";

export default function AddUserForm({
  setUsers,
}: {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}) {
  const [name, setName] = useState("");
  const [isLoading, setisLoading] = useState(false);

  // adding new user
  const addUser = async () => {
    // name field validation
    const nameLength = name?.trim().length;

    if (nameLength < 3 || nameLength > 16) {
      toast.warning("Name should have min. 3 and max. 16 letters");
      return;
    }

    setisLoading(true);
    API.post("/add-user", { name })
      .then((res) => {
        console.log(res);
        setUsers((prev) => [...prev, res.data.data]); // adding new user to users dropdown
        toast.success(res.data.message);
        setName("");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data.errMessage);
      })
      .finally(() => setisLoading(false));
  };

  return (
    <div className="flex flex-col gap-5 mb-8">
      <h1 className="text-2xl font-semibold">Add New User</h1>
      <Input
        placeholder="Enter User Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Button
        onClick={addUser}
        variant="custom"
        className="w-24"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Add User"}
      </Button>
    </div>
  );
}
