export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  totalPoints: number;
}

export type IUserDocument = IUser & Document;

export interface IClaim {
  _id?: mongoose.Types.ObjectId;
  awardedTo: mongoose.Types.ObjectId;
  claimedPoints: number;
}

export type IClaimDocument = IClaim & Document;