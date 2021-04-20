const jwt = require("jsonwebtoken");
const User = require("./../models/UserModel");

module.exports.isAuthenticated = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const { _id } = jwt.verify(token, process.env.JWT_VERIFY);
    const user = await User.findById(_id).select("-password");
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send("invalid Token");
  }
};
