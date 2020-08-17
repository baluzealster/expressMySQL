const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Router = require("express").Router();

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "./uploads",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

Router.post(
  "/upload",
  upload.single("file") /* name attribute of <file> element in your form */,
  (req, res) => {
    console.log(req.file.path);
    const imagePath = req.file.path;
    const targetPath = path.join(__dirname, "../uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(imagePath, targetPath, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("helo");
        res.status(200).contentType("text/plain").end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);
module.exports = Router;
