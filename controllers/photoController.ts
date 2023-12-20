import File from "../tools";
import { cwd } from "node:process";

const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "tmp_uploads/" });

router.post(
  "/add",
  upload.array("files", 2),
  async (req: any, res: Response) => {
    let reuslt = {
      success: false,
      message: "",
    };

    req.files.forEach((file: any) => {
      const filePath = path.join(cwd(), file.path);
      const newFilePath = path.join(
        cwd(),
        "user",
        req.session.user.account,
        file.originalname
      );
      File.copyFile(filePath, newFilePath);
      File.deleteFile(cwd(), file.path);
    });
    res.json();
  }
);

module.exports = router;
