const Group = require("../../src/models/groups");

const perm_gen = function (req, groups) {
  groups.forEach((group) => {
    req.user.vperms = group.forEach(() => {});
  });
};
