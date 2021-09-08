const mongoose = require("mongoose");
const permissions = require("./Schemas/permissonSchema");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
    permissions: {
      type: permissions,
      required: true,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

groupSchema.virtual("Members", {
  ref: "User",
  localField: members.name,
  foreignField: "_id",
});

const model = mongoose.model("Group", groupSchema);
