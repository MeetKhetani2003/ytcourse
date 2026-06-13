import mongoose, { Schema, Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  title: string;
  discountAmount: number;
  startDate: Date;
  expiryDate: Date;
  active: boolean;
  usageCount: number;
  createdAt: Date;
}

const CouponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
  title: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Coupon = mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
