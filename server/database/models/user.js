const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["online", "offline", "verified", "unverified", "disabled"],
    default: "unverified"
  },
  type: {
    type: String,
    enum: ["user", "admin", "manager", "server"],
    default: "user"
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

UserSchema
  .virtual("name")
  .get(() => {
    return this.firstName + " " + this.lastName;
  });

module.exports = mongoose.model("User", UserSchema);
