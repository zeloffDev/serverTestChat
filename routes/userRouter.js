const userController = require("../controller/userController");
const router = require("express").Router();

router.post("/signup", userController.signup);
router.post("/signIn", userController.signIn);
router.get("/listUser", userController.getListUser);
router.get("/listFriend", userController.getListFriend);

router.get("/listFriendRequest", userController.getListFriendRequest);
router.put("/addFriendRequest", userController.addFriendRequest);
router.delete("/deleteFriendRequest", userController.deleteFriendRequest);

router.put("/addFriend", userController.addFriend);
router.delete("/deleteFriend", userController.deleteFriend);

module.exports = router;
