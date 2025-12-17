const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const userController = require("./user.controller");

router.get("/", auth, userController.getAllUsers);

module.exports = router;
