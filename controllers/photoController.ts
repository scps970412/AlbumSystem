import File from "../tools";
import { cwd } from "node:process";
import PhotoService from "../service/photoService";
import { Photo } from "../models/photo";

var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "tmp_uploads/" });

router.post("/add", upload.array("files", 2), async (req: any, res: any) => {
  let reuslt = {
    success: false,
    message: "",
  };

  let user = req.session.user;
  let isExis: boolean = false;
  const file = req.file;
  const userPath = path.join(cwd(), "user", user.account, "測試2");
  const newFilePath = path.join(userPath, file.originalname);
  if (File.isExist(newFilePath)) {
    isExis = true;
    reuslt.success = false;
    reuslt.message = "檔案名稱已重複";
  }

  if (!isExis) {
    const filePath = path.join(cwd(), file.path);
    const newFilePath = path.join(userPath, file.originalname);
    File.copyFile(filePath, newFilePath);
    File.deleteFile(cwd(), file.path);
  }

  res.status(200).json(reuslt);
});

module.exports = router;
