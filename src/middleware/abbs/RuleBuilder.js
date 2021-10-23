const { AbilityBuilder, Ability } = require("@casl/ability");
const {
  visitor,
  teacher,
  tafelritter,
  admin,
  defaulta,
} = require("./rulesin_JSON");

let ANONYMOUS_ABILITY;

function defineAbilityFor(user) {
  if (user) {
    return new Ability(defineRulesFor(user));
  }

  ANONYMOUS_ABILITY = ANONYMOUS_ABILITY || new Ability(defineRulesFor({}));
  return ANONYMOUS_ABILITY;
}

function defineRulesFor(user) {
  // switch (user.role) {
  //   case "admin":
  //     define_Admin_Rules(builder, user);
  //     break;
  //   case "tafelritter":
  //     define_Anonymous_Rules(builder);
  //     define_Tafelritter_Rules;
  //     define_Basic_Rules(builder, user);
  //     break;
  //   case "teacher":
  //     define_Teacher_Rules(builder, user);
  //     define_Anonymous_Rules(builder);
  //     break;
  //   case "visitor":
  //     define_Basic_Rules(builder, user);
  //     define_Anonymous_Rules(builder, user);
  //     break;
  //   default:
  //     define_Anonymous_Rules(builder, user);
  //     break;
  // }

  switch (user.role) {
    case "admin":
      return admin;
    case "tafelritter":
      return tafelritter;
    case "teacher":
      return teacher;
    case "visitor":
      return visitor;
    default:
      return defaulta;
  }
}

// function define_Admin_Rules({ can, cannot }) {
//   can("manage", "all");
//   cannot("update", "Users", ["passwort"]);
// }

// function define_Tafelritter_Rules({ can, cannot }, _user) {
//   can(["read", "write", "update"], ["Rooms"]);
//   can(["read", "create"], ["Tasks"]);
//   can(["update"], ["Tasks"], { resolved: false });
//   cannot(["manage"], ["Users"]).because("You are not Allowed to see Users.");
// }

// function define_Teacher_Rules({ can }, user) {
//   can(["read", "create"], ["Tasks"], { creator: user._id });
// }

// function define_Basic_Rules({ can }, user) {
//   can("update", "User", ["name", "password", "avatar"], { _id: user._id });
// }

// function define_Anonymous_Rules({ can }) {
//   can("read", "Rooms");
// }

module.exports = {
  defineRulesFor,
  defineAbilityFor,
};
