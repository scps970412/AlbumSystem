import { Album } from "./../models/album";
import { Response } from "express";
import AlbumService from "../service/albumService";

var express = require("express");
var router = express.Router();

router.post("/add", async function (req: any, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  let album: Album = req.body;
  album.userId = req.session.user.id;
  let titleIsExist: boolean = await AlbumService.checkTitle(album);
  if (!titleIsExist) {
    reuslt.message = "資料夾名稱以重複";
    res.json(reuslt);
  }

  let isAdd: boolean = await AlbumService.add(album);
  reuslt.success = isAdd;
  if (isAdd) {
    reuslt.message = "新增成功";
  } else {
    reuslt.message = "新增失敗";
  }
  res.json(reuslt);
});

router.post("/Update", async function (req: any, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  let album: Album = req.body;
  album.userId = req.session.user.id;
  let titleIsExist: boolean = await AlbumService.checkTitle(album);
  if (!titleIsExist) {
    reuslt.message = "資料夾名稱以重複";
    res.json(reuslt);
  }

  let isUpdate: boolean = await AlbumService.update(album);
  reuslt.success = isUpdate;
  if (isUpdate) {
    reuslt.message = "修改成功";
  } else {
    reuslt.message = "修改失敗";
  }
  res.json(reuslt);
});

router.post("/Delete", async function (req: any, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  let album: Album = req.body;
  let isDelete: boolean = await AlbumService.delete(album);
  reuslt.success = isDelete;
  if (isDelete) {
    reuslt.message = "刪除成功";
  } else {
    reuslt.message = "刪除失敗";
  }
  res.json(reuslt);
});

module.exports = router;
