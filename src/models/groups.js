const groupSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
    permissions: {
      type: Object,
      required: true,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

groupSchema.methods.toJSON = function () {
  const pre = this.permissions;

  var build = {};

  const prod = Object.keys(pre).forEach((key) => {
    build[key] = pre[key] === 1 ? true : false;
  });

  return prod;
};
