import { User } from "./../models/user";
import { Request, Response } from "express";
import UserService from "../service/userService";
import userService from "../service/userService";

var express = require("express");
var router = express.Router();

router.post("/add", function (req: Request, res: Response, next: any) {
  let user: User = req.body;
  let isAdd: boolean = UserService.add(user);
  res.json(isAdd);
  next();
});

module.exports = router;
