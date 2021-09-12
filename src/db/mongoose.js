const mongoose = require("mongoose");
const { accessibleRecordsPlugin } = require("@casl/mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});

mongoose.plugin(accessibleRecordsPlugin);
