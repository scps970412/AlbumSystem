import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//解析json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//router設定
var userRouter = require("./controllers/userController");
app.use("/user", userRouter);

//db設定
export var pgp = require("pg-promise")(/*options*/);
export const cn = {
  host: "192.168.1.86",
  port: 5432,
  database: "albumsystem",
  user: "postgres",
  password: "860315",
};

export const db = pgp(cn);
