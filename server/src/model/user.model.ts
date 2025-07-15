import mongoose, { model, Schema } from "mongoose";
import { IUserDocument } from "../types/types";

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Name is required"],
  },
  totalPoints: { type: Number, default: 0 },
});

const User = model<IUserDocument>("User", userSchema);

export default User;
