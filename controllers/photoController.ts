import File from "../tools";
import { cwd } from "node:process";
import PhotoService from "../service/photoService";
import AlbumService from "../service/albumService";
import Photo from "../models/photo";
import Album from "../models/album";

var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "tmp_uploads/" });

router.post("/add", upload.single("file"), async (req: any, res: any) => {
  let reuslt = {
    success: true,
    message: "",
  };

  const file = req.file;
  let photo: Photo = {
    id: 0,
    albumid: Number(req.body.albumid),
    filename: file.originalname,
    description: req.body.description,
  };

  let user = req.session.user;
  let album: Album = await AlbumService.getById(photo.albumid);
  const userPath = path.join(cwd(), "user", user.account, album.title);
  const newFilePath = path.join(userPath, file.originalname);
  let isExis: boolean = File.isExist(newFilePath);
  if (isExis) {
    reuslt.success = false;
    reuslt.message = "檔案名稱已重複";
  } else {
    let isAdd: boolean = await PhotoService.add(photo);
    if (isAdd) {
      const filePath = path.join(cwd(), file.path);
      const newFilePath = path.join(userPath, file.originalname);
      File.copyFile(filePath, newFilePath);
      reuslt.message = "新增成功";
    } else {
      reuslt.message = "新增失敗";
    }
  }
  File.deleteFile(cwd(), file.path);

  res.status(200).json(reuslt);
});

router.post(
  "/update",
  upload.single("file"),
  async function (req: any, res: any) {
    let reuslt = {
      success: false,
      message: "",
    };

    const file = req.file;
    let photo: Photo = {
      id: Number(req.body.id),
      albumid: Number(req.body.albumid),
      filename: file == undefined ? "" : file.originalname,
      description: req.body.description,
    };
    let album: Album = await AlbumService.getById(photo.albumid);
    const userPath = path.join(
      cwd(),
      "user",
      req.session.user.account,
      album.title
    );

    let isExis: boolean = true;
    let dbPhoto: Photo = await PhotoService.getById(photo.id);
    if (photo.filename == "") {
      photo.filename = dbPhoto.filename;
    } else {
      const newFile = path.join(userPath, file.originalname);
      isExis = File.isExist(newFile);
      if (isExis) {
        reuslt.success = false;
        reuslt.message = "檔案名稱已重複";
      }
    }

    if (file != undefined) {
      const newFile = path.join(userPath, file.originalname);
      File.deleteFile(userPath, dbPhoto.filename);
      const tempPath = path.join(cwd(), file.path);
      File.copyFile(tempPath, newFile);
    }

    let isUpdate = await PhotoService.update(photo);
    if (isUpdate) {
      reuslt.message = "修改成功";
    } else {
      reuslt.message = "修改失敗";
    }

    if (file != undefined) {
      File.deleteFile(cwd(), file.path);
    }

    res.status(200).json(reuslt);
  }
);

router.post("/delete", async (req: any, res: any) => {
  let reuslt = {
    success: true,
    message: "",
  };
  let id = Number(req.body.id);
  let photo: Photo = await PhotoService.getById(id);
  let album: Album = await AlbumService.getById(photo.albumid);

  let isDelect = await PhotoService.delete(photo);
  if (isDelect) {
    let user = req.session.user;
    let fliePath = path.join(cwd(), "user", user.account, album.title);
    File.deleteFile(fliePath, photo.filename);
    reuslt.message = "刪除成功";
  } else {
    reuslt.success = false;
    reuslt.message = "刪除失敗";
  }
  res.status(200).json(reuslt);
});

module.exports = router;
