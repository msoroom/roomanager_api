const {
  adminperms,
  tafelritterperms,
  visitorperms,
  anonymperms,
} = require("./rulesin_JSON");

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

  ANONYMOUS_ABILITY = new Ability(defineRulesFor({}));
  return ANONYMOUS_ABILITY;
}

function defineRulesFor(user) {
  let perms;

  switch (user.role) {
    case "admin":
      perms = adminperms(perms, user);
      break;
    case "tafelritter":
      perms = tafelritterperms(perms, user);
      break;
    case "visitor":
      perms = visitorperms(perms, user);
      break;
    case "teacher":
      perms = teacherperms(perms, user);
      break;
    default:
      perms = anonymperms(perms, user);
      break;
  }
  return perms;
}

module.exports = {
  defineRulesFor,
  defineAbilityFor,
};
