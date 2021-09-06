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
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Group", groupSchema);
