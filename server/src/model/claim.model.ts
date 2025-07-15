import mongoose, { model, Schema } from "mongoose";
import { IClaimDocument } from "../types/types";

const claimSchema = new Schema<IClaimDocument>({
  awardedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  claimedPoints: Number,
});

const Claim = model<IClaimDocument>("Claim", claimSchema);

export default Claim;
