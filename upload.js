const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "uploads/";
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  const imagePath = req.file.path;
  const outputPath = imagePath.replace(/\\/g, "/");
  res.send(outputPath);
});

router.delete("/", upload.single("file"), (req, res) => {
  const body = req.body;
  const filePath = body.filePath;
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.send(`Error deleting file: ${err}`);
      } else {
        res.send(`File ${filePath} has been deleted successfully.`);
      }
    });
  } else {
    res.send(`File ${filePath} does not exist.`);
  }
});

module.exports = router;
