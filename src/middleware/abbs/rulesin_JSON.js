module.exports.adminperms = function adminperms(perms = [], user = null) {
  return [
    ...perms,
    ...[
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
      {
        action: ["update", "read"],
        subject: "User",
        fields: "role",
        condition: { role: "admin", inverted: true },
      },
    ],
  ];
};

module.exports.tafelritterperms = function tafelritterperms(
  perms = [],
  user = null
) {
  return [
    ...perms,
    ...[
      { action: ["read", "write", "update"], subject: ["Rooms"] },
      { action: ["read", "create"], subject: ["Tasks"] },
      {
        action: ["update"],
        subject: ["Tasks"],
        condition: { resolved: false },
      },
      {
        action: ["manage"],
        subject: ["Users"],
        reason: "You are not Allowed to manage users not even your Self.",
        inverted: true,
      },
    ],
  ];
};

module.exports.teacher = function teacherperms(perms = [], user = null) {
  return [
    ...perms,
    ...[
      {
        action: ["read"],
        subject: ["Tasks"],
        condition: { creator: user._id },
      },
      {
        action: ["create"],
        subject: ["tasks"],
      },
      {
        action: ["read"],
        subject: ["Rooms"],
      },
    ],
  ];
};

module.exports.visitorperms = function visitorperms(perms = [], user = null) {
  return [
    ...perms,
    ...[
      {
        action: "read",
        subject: "User",
        fields: ["name", "role"],
        condition: { _id: user._id },
      },
      [{ action: "delete", subject: "User", condition: { _id: user._id } }],
    ],
  ];
};

module.exports.anonymperms = function anonymperms(perms = [], user = null) {
  return [...perms, ...[{ action: ["read"], subject: "Rooms" }]];
};
