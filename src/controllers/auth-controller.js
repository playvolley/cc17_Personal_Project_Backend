const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    console.log("data = ", data);
    const existUser = await userService.findUserByUser(data.username);
    console.log("existUser = ", existUser);
    if (existUser) {
      res.status(400).json({ message: "username already in use" });
      createError({
        message: "username already in use",
        field: "username",
        statusCode: 400,
      });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: "user has been created" });
  } catch (err) {
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByUser(req.input.username);
    if (!existUser) {
      createError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }
    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    );
    if (!isMatch) {
      createError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
