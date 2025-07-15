import { useEffect, useState } from "react";
import AddUserForm from "./components/AddUserForm";
import API from "./lib/api";
import Leaderboard from "./components/Leaderboard";
import type { IUser } from "../../server/src/types/types";
import ClaimPoints from "./components/ClaimPoints";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isLoading, _setisLoading] = useState(true);

  // fetching all users details on first render
  useEffect(() => {
    API.get("/get-users")
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-xl mx-auto md:my-20 xl:my-0 rounded-xl bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 space-y-6">
      <AddUserForm setUsers={setUsers} />
      <ClaimPoints
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <Leaderboard users={users} isLoading={isLoading} />
    </div>
  );
}

export default App;
