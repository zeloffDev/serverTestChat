const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const payload = require("../payload/payload");
const { extractPublicIdFromUrl } = require("../utils");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({ cloud_name, api_key, api_secret });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "src/uploads/";
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
const uploadCloud = multer();

router.post("/", upload.single("file"), (req, res) => {
  const imagePath = req.file.path;
  const outputPath = imagePath.replace(/\\/g, "/");
  res.send(payload.createApiResponseSuccess({ data: outputPath }));
});

router.delete("/", (req, res) => {
  const body = req.body;
  const filePath = body.filePath;
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.send(
          payload.createApiResponseError({
            message: `Error deleting file: ${err}`,
          })
        );
      } else {
        res.send(
          payload.createApiResponseSuccess({
            message: `File ${filePath} has been deleted successfully.`,
          })
        );
      }
    });
  } else {
    res.send(
      payload.createApiResponseError({
        message: `File ${filePath} does not exist.`,
      })
    );
  }
});

router.post("/cloud", uploadCloud.any(), (req, res) => {
  const imageFile = req.files[0];
  const tempFilePath = "./temp_image.jpg";
  fs.writeFile(tempFilePath, imageFile.buffer, function (err) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send(
          payload.createApiResponseError({ data: "Error saving image file" })
        );
    } else {
      cloudinary.uploader.upload(tempFilePath, function (error, result) {
        if (error) {
          console.error(error);
          res
            .status(500)
            .send(payload.createApiResponseError({ data: "Upload failed" }));
        } else {
          const imageUrl = result.secure_url;
          res
            .status(200)
            .send(payload.createApiResponseSuccess({ data: imageUrl }));
        }
      });
    }
  });
});

router.delete("/cloud", (req, res) => {
  const body = req.body;
  const resources = extractPublicIdFromUrl(body.resources);
  cloudinary.api.delete_resources(
    resources,
    { type: "upload", resource_type: "image" },
    function (error, result) {
      if (error) {
        res.send(
          payload.createApiResponseError({
            message: error,
          })
        );
      } else {
        res
          .status(200)
          .send(payload.createApiResponseSuccess({ data: result }));
      }
    }
  );
});

module.exports = router;
