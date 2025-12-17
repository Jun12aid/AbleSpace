const router = require("express").Router();
const controller = require("./auth.controller");
const auth = require("../../middlewares/auth.middleware");
const userController = require("../user/user.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);

// 🔴 FIXED
router.get("/me", auth, userController.profile);

module.exports = router;
