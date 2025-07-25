const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

const PERMISSIONS = {
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
  
  // Quyền quản lý danh mục
  CREATE_CATEGORY: 'create_category',
  READ_CATEGORY: 'read_category',
  UPDATE_CATEGORY: 'update_category',
  DELETE_CATEGORY: 'delete_category',
  
  // Quyền quản lý nhà sản xuất
  CREATE_MANUFACTURER: 'create_manufacturer',
  READ_MANUFACTURER: 'read_manufacturer',
  UPDATE_MANUFACTURER: 'update_manufacturer',
  DELETE_MANUFACTURER: 'delete_manufacturer',
  
  // Quyền quản lý review
  CREATE_REVIEW: 'create_review',
  READ_REVIEW: 'read_review',
  UPDATE_REVIEW: 'update_review',
  DELETE_REVIEW: 'delete_review',
  MODERATE_REVIEW: 'moderate_review',
  
  // Quyền hệ thống
  ACCESS_ADMIN_PANEL: 'access_admin_panel',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings'
};

// Định nghĩa quyền mặc định cho từng role
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin có tất cả quyền
    ...Object.values(PERMISSIONS)
  ],
  [ROLES.USER]: [
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.READ_CATEGORY,
    PERMISSIONS.READ_MANUFACTURER,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.READ_ORDER,
    PERMISSIONS.CREATE_REVIEW,
    PERMISSIONS.READ_REVIEW,
    PERMISSIONS.UPDATE_REVIEW,
    PERMISSIONS.DELETE_REVIEW
  ]
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username là bắt buộc'],
    unique: true,
    trim: true,
    minlength: [3, 'Username phải có ít nhất 3 ký tự'],
    maxlength: [30, 'Username không được vượt quá 30 ký tự'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username chỉ được chứa chữ cái, số và dấu gạch dưới']
  },
  
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
  },
  
  password: {
    type: String,
    required: [true, 'Password là bắt buộc'],
    minlength: [6, 'Password phải có ít nhất 6 ký tự'],
    select: false
  },

  fullName: {
    type: String,
    required: [true, 'Họ tên là bắt buộc'],
    trim: true,
    maxlength: [100, 'Họ tên không được vượt quá 100 ký tự']
  },
  
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ']
  },
  
  address: {
    street: { type: String, trim: true },
    ward: { type: String, trim: true },
    district: { type: String, trim: true },
    city: { type: String, trim: true },
    zipCode: { type: String, trim: true }
  },
  
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: 'Ngày sinh phải là ngày trong quá khứ'
    }
  },
  
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },

  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  },
  
  permissions: [{
    type: String,
    enum: Object.values(PERMISSIONS)
  }],
  
  customPermissions: [{
    type: String,
    enum: Object.values(PERMISSIONS)
  }],

  isActive: {
    type: Boolean,
    default: true
  },
  
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  passwordResetToken: String,
  passwordResetExpires: Date,

  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  
  twoFactorSecret: {
    type: String,
    select: false
  },
  
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  lockUntil: Date,

  loginHistory: [{
    ip: String,
    userAgent: String,
    loginAt: {
      type: Date,
      default: Date.now
    }
  }],

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  lastLoginAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

userSchema.virtual('allPermissions').get(function() {
  const rolePermissions = ROLE_PERMISSIONS[this.role] || [];
  const customPerms = this.customPermissions || [];
  return [...new Set([...rolePermissions, ...customPerms])];
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasPermission = function(permission) {
  return this.allPermissions.includes(permission);
};

userSchema.methods.hasAllPermissions = function(permissions) {
  return permissions.every(permission => this.hasPermission(permission));
};

userSchema.methods.hasAnyPermission = function(permissions) {
  return permissions.some(permission => this.hasPermission(permission));
};

userSchema.methods.hasRole = function(role) {
  return this.role === role;
};

userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

userSchema.methods.incLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  const maxAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000;

  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked()) {
    updates.$set = { lockUntil: new Date(Date.now() + lockTime) };
  }
  
  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

userSchema.statics.findByCredentials = async function(emailOrUsername, password) {
  const user = await this.findOne({
    $or: [
      { email: emailOrUsername.toLowerCase() },
      { username: emailOrUsername }
    ],
    isActive: true
  }).select('+password');
  
  if (!user) {
    throw new Error('Thông tin đăng nhập không chính xác');
  }
  
  if (user.isLocked()) {
    throw new Error('Tài khoản đã bị khóa. Vui lòng thử lại sau');
  }
  
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    await user.incLoginAttempts();
    throw new Error('Thông tin đăng nhập không chính xác');
  }
  
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }
  
  return user;
};

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isNew && !this.permissions.length) {
    this.permissions = ROLE_PERMISSIONS[this.role] || [];
  }
  
  next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS
};