import mongoose, { model, Schema } from "mongoose";

export interface IClaim {
  _id?: mongoose.Types.ObjectId;
  awardedTo: mongoose.Types.ObjectId;
  claimedPoints: number;
}

export type ClaimDocument = IClaim & Document;

const claimSchema = new Schema<ClaimDocument>({
  awardedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  claimedPoints: Number,
});

const Claim = model<ClaimDocument>("Claim", claimSchema);

export default Claim;
