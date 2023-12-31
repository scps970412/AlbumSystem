import { Response } from "express";
import File from "../tools";
import { cwd } from "node:process";
import Album from "./../models/album";
import AlbumService from "../service/albumService";
import PhotoService from "../service/photoService";

var express = require("express");
const path = require("path");
var router = express.Router();

router.post("/add", async function (req: any, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  let album: Album = req.body;
  album.userid = req.session.user.id;
  let dbAlbum: Album = await AlbumService.checkTitle(album);
  if (dbAlbum != null) {
    reuslt.message = "資料夾名稱以重複";
    res.json(reuslt);
    return;
  }

  let isAdd: boolean = await AlbumService.add(album);
  reuslt.success = isAdd;
  if (isAdd) {
    let filePath = path.join(cwd(), "user", req.session.user.account);
    File.createFolder(filePath, album.title);

    reuslt.message = "新增成功";
  } else {
    reuslt.message = "新增失敗";
  }

  res.status(200).json(reuslt);
});

router.post("/update", async function (req: any, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  let album: Album = req.body;
  album.userid = req.session.user.id;

  let dbAlbum: Album = await AlbumService.checkTitle(album);

  if (dbAlbum !== null) {
    reuslt.message = "資料夾名稱已重複";
    res.json(reuslt);
    return;
  }

  dbAlbum = await AlbumService.getById(album.id);
  let isUpdate: boolean = await AlbumService.update(album);
  reuslt.success = isUpdate;
  if (isUpdate) {
    let filePath = path.join(cwd(), "user", req.session.user.account);
    File.rename(filePath, dbAlbum.title, album.title);

    reuslt.message = "修改成功";
  } else {
    reuslt.message = "修改失敗";
  }
  res.status(200).json(reuslt);
});

router.post("/delete", async function (req: any, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  let album: Album = req.body;
  album = await AlbumService.getById(album.id);
  await PhotoService.deleteByAlbumId(album.id);
  let isDelete: boolean = await AlbumService.delete(album);
  reuslt.success = isDelete;
  if (isDelete) {
    let filePath = path.join(
      cwd(),
      "user",
      req.session.user.account,
      album.title
    );
    File.deleteDir(filePath);
    reuslt.message = "刪除成功";
  } else {
    reuslt.message = "刪除失敗";
  }
  res.status(200).json(reuslt);
});

module.exports = router;
