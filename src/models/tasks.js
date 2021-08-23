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

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Room",
    },
  },
  {
    timestamps: true,
  }
);

const Taskmodel = new mongoose.model("Task", taskSchema);

module.exports = Taskmodel;
