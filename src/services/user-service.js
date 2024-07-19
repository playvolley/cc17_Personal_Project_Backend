const prisma = require("../models/prisma");

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByUser = (user) =>
  prisma.user.findFirst({ where: { username: user } });

userService.findUserById = (userId) =>
  prisma.user.findUnique({ where: { id: userId } });

module.exports = userService;
