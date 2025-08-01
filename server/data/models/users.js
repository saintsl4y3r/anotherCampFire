import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "customer"],
    required: true,
  },
  displayName: String,
  profile: {
    fullName: String,
    phoneNumber: String,
    gender: String,
  },
  status: {
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  preferences: {
    language: String,
    currency: String,
  },
  stats: {
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
  collection: "users"
});

export { UserSchema };
