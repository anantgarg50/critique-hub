const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 12;

const AddressSchema = new Schema({
  lineOne: {
    type: String,
    trim: true
  },
  lineTwo: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: Number,
    trim: true
  }
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  phone: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    required: true,
    trim: true,
    unique: true
  },
  userAddress: {
    type: AddressSchema,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"]
  },
  dateOfBirth: {
    type: Date,
    max: Date.now
  },
  bio: {
    type: String
  },
  interests: {
    type: [String]
  },
  expectationsFromCommunity: {
    type: String
  },
  status: {
    type: String,
    enum: ["online", "offline", "verified", "unverified", "disabled", "deleted"],
    default: "unverified"
  },
  role: {
    type: String,
    enum: ["user", "admin", "communityBuilder"],
    default: "user"
  },
  communities: {
    type: [Schema.Types.ObjectId]
  },
  lastLogin: {
    type: Date
  }
},
{
  timestamps: true
});

UserSchema
  .virtual("name")
  .get(() => {
    return this.firstName + " " + this.lastName;
  });

UserSchema
  .virtual("address")
  .get(() => {
    const address = this.userAddress;
    return address.lineOne + " " + address.lineTwo + ", " + address.city + ", " + address.state + ", " + address.country + " ‒ " + address.postalCode;
  });

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
})

UserSchema.statics.checkPassword = function (creds, next) {
  let error;

  this.findOne({ email: creds.email })
    .exec()
    .then((user) => {
      if (user) {
        bcrypt.compare(creds.password, user.password)
          .then((hasMatched) => {
            if (hasMatched) {
              next(null, user);
            } else {
              error = new Error("Incorrect Password!");
              error.status = 401;
              next(error);
            }
          })
          .catch((err) => {
            next(err);
          })
      } else {
        error = new Error("Invalid E-mail!");
        error.status = 401;
        next(error);
      }
    })
    .catch((err) => {
      next(err);
    })
}

UserSchema.methods.comparePassword = function (password) {
  bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);
