import { User, userValidate } from "./../models/user";
import { Request, Response } from "express";
import userService from "../service/userService";

var express = require("express");
const md5 = require("js-md5");
const { validationResult } = require("express-validator");
var router = express.Router();

router.post("/add", userValidate, async function (req: Request, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let user: User = req.body;
    let userIdIsExist: boolean = await userService.checkUserId(user.userId);
    if (userIdIsExist) {
      reuslt.message = "帳號以存在";
    } else {
      let emailIsExist: boolean = await userService.checkEmail(user.email);
      if (emailIsExist) {
        reuslt.message = "信箱以存在";
      } else {
        user.password = md5(user.password);
        let isAdd: boolean = userService.add(user);
        if (isAdd) {
          reuslt.success = true;
          reuslt.message = "註冊成功";
        } else {
          reuslt.message = "註冊失敗";
        }
      }
    }
  } else {
    reuslt.message = ErrorMessageFormat(errors);
  }

  res.json(reuslt);
});

router.post(
  "/login",
  userValidate,
  async function (req: Request, res: Response) {
    let user: User = req.body;

    const errors = validationResult(req);
    let reuslt = {
      success: false,
      message: "",
    };
    if (errors.isEmpty()) {
      user.password = md5(user.password);
      let isLogin: boolean = await userService.checkLogin(user);

      if (isLogin) {
        reuslt.success = true;
        reuslt.message = "登入成功";
      } else {
        reuslt.message = "登入失敗";
      }
    } else {
      reuslt.message = ErrorMessageFormat(errors);
    }

    res.json(reuslt);
  }
);

function ErrorMessageFormat(errors: any) {
  let message = "";
  errors.array().forEach((element: any) => {
    message += element.msg + ",";
  });
  message = message.slice(0, -1);
  return message;
}

module.exports = router;
