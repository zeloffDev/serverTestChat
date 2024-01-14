const userController = require("../controller/userController");
const router = require("express").Router();

router.post("/signup", userController.signup);
router.get("/listUser", userController.getListUser);
router.get("/listFriend", userController.getListFriend);

module.exports = router;
