const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  //props
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    props: {
      type: Object,
      required: true,
      default: {},
    },
    buckedlist: {
      type: Object,
      required: true,
      default: {},
    },

    pics: [
      {
        pic: {
          type: Buffer,
          required: true,
        },

        order: {
          type: Number,
        },
      },
    ],
    compartment: {
      type: Number,
      default: 0,
    },
  },

  //kein plan
  {
    timestamps: true,
  }
);

roomSchema.virtual("tasks", {
  ref: "Task",
  localField: "name",
  foreignField: "owner",
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
