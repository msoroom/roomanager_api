const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      default: "No discription providet",
    },

    state: {
      type: Number,
      required: true,
      default: 0,
    },

    resolver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    owner: {
      type: String,
      require: true,
      ref: "Room",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.virtual("Creator", {
  ref: "User",
  localField: "creator",
  foreignField: "_id",
});

const Taskmodel = new mongoose.model("Task", taskSchema);

module.exports = Taskmodel;
