import { User, userValidate } from "./../models/user";
import { Request, Response } from "express";
import UserService from "../service/userService";
import File from "../tools";
import { cwd } from "node:process";

var express = require("express");
const md5 = require("js-md5");
const { validationResult } = require("express-validator");
var router = express.Router();
const path = require("path");

router.post("/add", userValidate, async function (req: Request, res: Response) {
  let reuslt = {
    success: false,
    message: "",
  };

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let user: User = req.body;
    let accountIsExist: boolean = await UserService.checkAccount(user.account);
    if (accountIsExist) {
      reuslt.message = "帳號以存在";
    } else {
      let emailIsExist: boolean = await UserService.checkEmail(user.email);
      if (emailIsExist) {
        reuslt.message = "信箱以存在";
      } else {
        user.password = md5(user.password);
        let isAdd: boolean = await UserService.add(user);
        if (isAdd) {
          File.createFolder(path.join(cwd(), "user"), `${user.account}`);
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

router.post("/login", userValidate, async function (req: any, res: Response) {
  let user: User = req.body;

  const errors = validationResult(req);
  let reuslt = {
    success: false,
    message: "",
  };
  if (errors.isEmpty()) {
    user.password = md5(user.password);
    let loginUser: User = await UserService.checkLogin(user);

    if (loginUser != null) {
      req.session.user = loginUser;
      reuslt.success = true;
      reuslt.message = "登入成功";
    } else {
      reuslt.message = "登入失敗";
    }
  } else {
    reuslt.message = ErrorMessageFormat(errors);
  }

  res.json(reuslt);
});

function ErrorMessageFormat(errors: any) {
  let message = "";
  errors.array().forEach((element: any) => {
    message += element.msg + ",";
  });
  message = message.slice(0, -1);
  return message;
}

module.exports = router;
