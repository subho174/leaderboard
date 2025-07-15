import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import User, { IUser } from "../model/user.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

const addUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name }: IUser = req.body;

    // finding whether user already exists or not in db before creating a new one
    const oldUser = await User.findOne({ name }).select("_id").lean();

    if (oldUser)
      return res.status(400).json(new ApiError(400, "User already exists"));

    // creating a new user
    const newUser = await User.create({ name });

    if (!newUser)
      return res.status(400).json(new ApiError(400, "Failed to add new user"));

    return res
      .status(201)
      .json(new ApiResponse(201, "Added new user successfully", newUser));
  }
);

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // fetching all users details
    const users = await User.find({}).lean();

    if (!users)
      return res.status(404).json(new ApiError(404, "Failed to find users"));

    // sorting users by total points in descending order to assign ranks
    users.sort(
      (user1, user2) => Number(user2.totalPoints) - Number(user1.totalPoints)
    );

    return res
      .status(200)
      .json(new ApiResponse<IUser[]>(200, "Users found successfully", users));
  }
);

export { addUser, getAllUsers };
