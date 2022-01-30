import mongoose from "mongoose";

const Schema = mongoose.Schema;

if (mongoose.connection?.models["Users"]) {
  delete mongoose.connection?.models["Users"];
}

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
    select: false,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "Cities",
  },
  isAdmin: {
    type: Boolean,
    default: false,
    select: false,
  },
  dob: {
    type: Date,
  },
  about: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["m", "f"],
  },
  sentConfirmationEmailCount: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    default: null,
    select: false,
  },
  secretKey: {
    type: String,
    unique: true,
    select: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  accountBanned: {
    type: Boolean,
    default: false,
  },
  warnedCount: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Users", userSchema);
