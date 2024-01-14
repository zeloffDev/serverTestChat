const chatMassageController = require("../controller/chatMassageController");
const router = require("express").Router();

router.get("/", chatMassageController.getListHistoryMassage);
router.post("/", chatMassageController.createMassage);
router.put("/:massageId", chatMassageController.recallMassage);
router.delete("/:massageId", chatMassageController.deleteMassage);

module.exports = router;
