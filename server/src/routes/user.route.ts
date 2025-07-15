import { Router } from "express";
import { addUser, getAllUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/add-user", addUser);
userRouter.get('/get-users', getAllUsers);

export default userRouter;
