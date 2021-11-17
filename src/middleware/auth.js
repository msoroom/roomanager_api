const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { defineAbilityFor } = require("./abbs/RuleBuilder");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies["auth_token"];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    req.user.abb = defineAbilityFor(req.user);
    next();
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
};

module.exports = auth;
