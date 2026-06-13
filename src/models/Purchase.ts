import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: string;
  amount: number;
  paymentId: string; // The Razorpay payment ID or Payment model ID
  phone?: string;
  city?: string;
  stateName?: string;
  pincode?: string;
  gstin?: string;
  purchasedAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  courseId: { type: String, required: true, index: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true, index: true },
  phone: { type: String },
  city: { type: String },
  stateName: { type: String },
  pincode: { type: String },
  gstin: { type: String },
  purchasedAt: { type: Date, default: Date.now },
});


export const Purchase = mongoose.models.Purchase || mongoose.model<IPurchase>("Purchase", PurchaseSchema);
