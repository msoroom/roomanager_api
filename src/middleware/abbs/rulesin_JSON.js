const admin = [
  {
    action: "manage",
    subject: ["Rooms", "Tasks"],
  },
  {
    action: ["update", "read"],
    subject: "User",
    fields: ["name", "password", "avatar"],
    conditions: { _id: user._id },
  },
  {},
];

const tafelritter = [
  { action: ["read", "write", "update"], subject: ["Rooms"] },
  { action: ["read", "create"], subject: ["Tasks"] },
  { action: ["update"], subject: ["Tasks"], condition: { resolved: false } },
  {
    action: ["manage"],
    subject: ["Users"],
    reason: "You are not Allowed to manage users not even your Self.",
    inverted: true,
  },
];

const teacher = [
  {
    action: ["read", "create"],
    subject: ["Tasks"],
    condition: { creator: user._id },
  },
];

const visitor = [
  {
    action: ["update"],
    subject: ["Users"],
    fields: ["name", "password", "avatar"],
    condition: { _id: user._id },
  },
];

const defaulta = [
  {
    action: ["read"],
    subject: ["Rooms"],
    fields: ["name", "pictures", "info"],
  },
];

modeule.exports = { visitor, teacher, tafelritter, admin, defaulta };
