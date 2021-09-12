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
    resolved: {
      type: Boolean,
      default: false,
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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
