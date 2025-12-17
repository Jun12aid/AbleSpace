const router = require("express").Router();
const controller = require("./task.controller");
const auth = require("../../middlewares/auth.middleware");

router.get("/", auth, controller.list);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);

module.exports = router;
