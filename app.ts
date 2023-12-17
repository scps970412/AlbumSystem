import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");

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
app.use("/user", userRouter);

//根路由
app.get("/", (req: any, res: Response) => {
  res.send("Hello World");
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
