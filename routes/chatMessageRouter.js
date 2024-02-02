const chatMassageController = require("../controller/chatMassageController");
const router = require("express").Router();

router.get("/", chatMassageController.getListHistoryMassage);
router.post("/", chatMassageController.createMassage);
router.put("/:messageId", chatMassageController.recallMassage);
router.delete("/:messageId", chatMassageController.deleteMassage);

module.exports = router;
