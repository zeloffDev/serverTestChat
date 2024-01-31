const friendController = require("../controller/friendController");
const router = require("express").Router();

router.get("/listUser", friendController.getListUser);
router.get("/listFriend", friendController.getListFriend);
router.get("/listFriendRequest", friendController.getListFriendRequest);
router.post("/addFriend", friendController.addFriend);
router.post("/addFriendRequest", friendController.addFriendRequest);
router.post("/revokeFriendRequest", friendController.revokeFriendRequest);
router.delete("/deleteFriendRequest", friendController.deleteFriendRequest);
router.delete("/deleteFriend", friendController.deleteFriend);

module.exports = router;
