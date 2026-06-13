import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: string;
  amount: number;
  couponCode?: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: "pending" | "completed" | "failed";
  phone?: string;
  city?: string;
  stateName?: string;
  pincode?: string;
  gstin?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  courseId: { type: String, required: true, index: true },
  amount: { type: Number, required: true },
  couponCode: { type: String, index: true },
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String, index: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  phone: { type: String },
  city: { type: String },
  stateName: { type: String },
  pincode: { type: String },
  gstin: { type: String },
  createdAt: { type: Date, default: Date.now },
});


export const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
