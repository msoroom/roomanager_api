const mongoose = require("mongoose");

const Permission = new mongoose.Schema(
  {
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    see_pics: {
      type: Boolean,
      default: true,
      required: true,
    },
    see_props: {
      type: Boolean,
      default: false,
      required: true,
    },
    edit_pics: {
      type: Boolean,
      default: false,
      required: true,
    },
    edit_props: {
      type: Boolean,
      default: false,
      required: true,
    },
    see_todo: {
      type: Boolean,
      default: false,
      required: true,
    },
    edit_todo: {
      type: Boolean,
      default: false,
      required: true,
    },
    see_tasks: {
      type: Boolean,
      default: false,
      required: true,
    },
    edit_tasks: {
      type: Boolean,
      default: false,
      required: true,
    },
    create_tasks: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  { strict: true }
);

Permission.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj._id;

  return obj;
};

module.exports = Permission;
