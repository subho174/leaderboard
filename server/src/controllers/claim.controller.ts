import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import Claim from "../model/claim.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import User from "../model/user.model";

const claimPoints = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: { userId: string } = req.body;

    // generating random number between 1 to 10 to award user as points
    const claimedPoints = Math.floor(Math.random() * 10) + 1;

    // creating a history in claims collection
    await Claim.create({ awardedTo: userId, claimedPoints });

    // increasing total claimed points of user
    const updatedPointsOfUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { totalPoints: claimedPoints },
      },
      { new: true }
    ).select('totalPoints -_id').lean();

    if (!updatedPointsOfUser)
      return res
        .status(400)
        .json(new ApiError(400, "Failed to award points to user"));

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          `${claimedPoints} points awarded to user successfully`,
          updatedPointsOfUser
        )
      );
  }
);

export default claimPoints;
