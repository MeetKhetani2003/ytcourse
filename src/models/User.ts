import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  googleId: string;
  role: "user" | "admin";
  purchasedCourses: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  image: { type: String },
  googleId: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  purchasedCourses: { type: [String], default: [], index: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
