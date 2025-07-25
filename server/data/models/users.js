import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const USER_PERMISSIONS = {
  CREATE_USER: 'create_user',
  READ_USER: 'read_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  CREATE_PRODUCT: 'create_product',
  READ_PRODUCT: 'read_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',
  CREATE_ORDER: 'create_order',
  READ_ORDER: 'read_order',
  UPDATE_ORDER: 'update_order',
  DELETE_ORDER: 'delete_order',
  MANAGE_ALL_ORDERS: 'manage_all_orders',
  CREATE_CATEGORY: 'create_category',
  READ_CATEGORY: 'read_category',
  UPDATE_CATEGORY: 'update_category',
  DELETE_CATEGORY: 'delete_category',
  CREATE_MANUFACTURER: 'create_manufacturer',
  READ_MANUFACTURER: 'read_manufacturer',
  UPDATE_MANUFACTURER: 'update_manufacturer',
  DELETE_MANUFACTURER: 'delete_manufacturer',
  CREATE_REVIEW: 'create_review',
  READ_REVIEW: 'read_review',
  UPDATE_REVIEW: 'update_review',
  DELETE_REVIEW: 'delete_review',
  MODERATE_REVIEW: 'moderate_review',
  ACCESS_ADMIN_PANEL: 'access_admin_panel',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_USERS: 'manage_users',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: Object.values(USER_PERMISSIONS),
  [USER_ROLES.USER]: [
    USER_PERMISSIONS.READ_USER,
    USER_PERMISSIONS.UPDATE_USER,
    USER_PERMISSIONS.READ_PRODUCT,
    USER_PERMISSIONS.READ_CATEGORY,
    USER_PERMISSIONS.READ_MANUFACTURER,
    USER_PERMISSIONS.CREATE_ORDER,
    USER_PERMISSIONS.READ_ORDER,
    USER_PERMISSIONS.CREATE_REVIEW,
    USER_PERMISSIONS.READ_REVIEW,
    USER_PERMISSIONS.UPDATE_REVIEW,
    USER_PERMISSIONS.DELETE_REVIEW,
  ],
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and hyphens'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  profile: {
    firstName: { type: String, trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 50 },
    fullName: { type: String, trim: true, maxlength: 100 },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (phone) => !phone || /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone),
        message: 'Please enter a valid phone number',
      },
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (date) => !date || date < new Date(),
        message: 'Date of birth must be in the past',
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say'],
      default: 'prefer_not_to_say',
    },
    bio: { type: String, maxlength: 500 },
    avatar: { url: String, publicId: String },
    coverImage: { url: String, publicId: String },
  },
  addresses: [{
    type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
    isDefault: { type: Boolean, default: false },
    fullName: String,
    phoneNumber: String,
    street: String,
    apartment: String,
    ward: String,
    district: String,
    city: String,
    province: String,
    country: { type: String, default: 'Vietnam' },
    postalCode: String,
    coordinates: { latitude: Number, longitude: Number },
  }],
  role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER },
  permissions: [{ type: String, enum: Object.values(USER_PERMISSIONS) }],
  customPermissions: [{ type: String, enum: Object.values(USER_PERMISSIONS) }],
  status: {
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isTwoFactorEnabled: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  security: {
    twoFactorSecret: { type: String, select: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    lastLoginAt: Date,
    lastLoginIp: String,
    loginHistory: [{
      timestamp: { type: Date, default: Date.now },
      ip: String,
      userAgent: String,
      device: String,
      location: String,
      success: Boolean,
    }],
  },
  preferences: {
    language: { type: String, default: 'vi' },
    currency: { type: String, default: 'VND' },
    timezone: { type: String, default: 'Asia/Ho_Chi_Minh' },
    emailNotifications: {
      orders: { type: Boolean, default: true },
      promotions: { type: Boolean, default: true },
      updates: { type: Boolean, default: true },
    },
    pushNotifications: {
      orders: { type: Boolean, default: true },
      promotions: { type: Boolean, default: false },
      updates: { type: Boolean, default: false },
    },
  },
  shopping: {
    cart: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1, min: 1 },
      addedAt: { type: Date, default: Date.now },
    }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    recentlyViewed: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      viewedAt: { type: Date, default: Date.now },
    }],
  },
  stats: {
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    membershipLevel: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum'],
      default: 'bronze',
    },
  },
  metadata: {
    referralCode: String,
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    source: String,
    tags: [String],
    notes: String,
  },
  deletedAt: Date,
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  toObject: { virtuals: true },
});

userSchema.index({ 'profile.phoneNumber': 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'status.isActive': 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'shopping.wishlist': 1 });
userSchema.index({ 'metadata.referralCode': 1 });

userSchema.virtual('displayName').get(function () {
  return this.profile.fullName || `${this.profile.firstName || ''} ${this.profile.lastName || ''}`.trim() || this.username;
});

userSchema.virtual('allPermissions').get(function () {
  return [...new Set([...(ROLE_PERMISSIONS[this.role] || []), ...(this.customPermissions || [])])];
});

userSchema.virtual('defaultAddress').get(function () {
  return this.addresses.find(a => a.isDefault) || this.addresses[0];
});

// ... instance methods, statics, pre-hooks giữ nguyên như cũ ..
const User = mongoose.model('User', userSchema);
export default User;
