const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const permissions = require("./Schemas/permissonSchema");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    role: {
      type: String,
      default: "visitor",
      enum: ["admin", "tafelritter", "visitor", "teacher"],
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
    toJSON: true,
  }
);

userSchema.virtual("CTask", {
  ref: "Task",
  localField: "_id",
  foreignField: "creator",
});

userSchema.virtual("RTask", {
  ref: "Task",
  localField: "_id",
  foreignField: "resolver",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObjekt = user.toObject();

  delete userObjekt.password;
  delete userObjekt.tokens;
  delete userObjekt.avatar;
  return userObjekt;
};

userSchema.methods.toPermissons = async function () {
  await this.populate({
    path: "Groups",
  });

  const perms = this.perms.toJSON();

  this.Groups.forEach((element) => {
    Object.key(element.perms).forEach((key) => {
      perms[key] = element.perms[key] || perms[key];
    });
  });
  return perms;
};

userSchema.statics.findByCredentials = async (name, password) => {
  const user = await User.findOne({ name });

  if (!user) throw new Error("Unabel to login");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Unabel to login");

  return user;
};

//Hash the plain Text pwd

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//delteUsertasks when user is removed

const User = mongoose.model("User", userSchema);

module.exports = User;
