import express, { Request, Response } from "express";
import File from "./tools";
const app = express();
var router = express.Router();
const port = process.env.PORT || 3000;
const session = require("express-session");
const multer = require("multer");
const upload = multer({ dest: "tmp_uploads/" });
//第一次執行必須要再跟目錄創建user資料夾，用於存放個使用者相簿
File.createFolder(__dirname, "user");

//express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // 不再 HTTPS 傳遞 cookie
      maxAge: 60 * 60 * 1000, // 一小時候失效
    },
  })
);

//解析json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//router設定
var userRouter = require("./controllers/userController");
var albumRouter = require("./controllers/albumController");
var photoRouter = require("./controllers/photoController");

app.use("/user", userRouter);
app.use("/album", albumRouter);
app.use("/photo", photoRouter);

module.exports = router;

//根路由
app.get("/", (req: any, res: Response) => {
  res.send("Hello World");
});

app.post("/a", upload.array("files", 2), (req: any, res) => {
  // app.post("/a", upload.single("file"), (req: any, res) => {
  // let files = req.file;
  console.log(req.files);
  req.files.forEach((file: any) => {
    console.log(file);
  });
  // if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //   //成立檔案
  // } else {
  //   console.log(2);
  // }

  // const formData = req.body;
  // console.log(req.file);
  res.sendStatus(200);
});

//db設定
export var pgp = require("pg-promise")(/*options*/);
export const cn = {
  host: "192.168.1.86",
  port: 5432,
  database: "albumsystem",
  user: "postgres",
  password: "860315",
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export const db = pgp(cn);
