import { User } from "./../models/user";
import { Request, Response } from "express";
import UserService from "../service/userService";
import userService from "../service/userService";

var express = require("express");
var router = express.Router();

router.post("/add", async function (req: Request, res: Response) {
  let user: User = req.body;
  let userIdIsExist: boolean = await userService.checkUserId(user.userId);
  let reuslt = {
    success: false,
    message: "",
  };

  if (userIdIsExist) {
    reuslt.message = "帳號以存在";
  } else {
    let emailIsExist: boolean = await userService.checkEmail(user.email);
    if (emailIsExist) {
      reuslt.message = "信箱以存在";
    } else {
      let isAdd: boolean = UserService.add(user);
      if (isAdd) {
        reuslt.success = true;
        reuslt.message = "註冊成功";
      } else {
        reuslt.message = "註冊失敗";
      }
    }
  }

  res.json(reuslt);
});

router.post("/login", async function (req: Request, res: Response) {
  let user: User = req.body;
  let isLogin: boolean = await userService.checkLogin(user);
  let result = {
    success: isLogin,
    message: "",
  };
  if (isLogin) {
    result.message = "登入成功";
  } else {
    result.message = "登入失敗";
  }
  res.json(result);
});
module.exports = router;
