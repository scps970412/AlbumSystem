import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//router設定

//db設定
var pgp = require("pg-promise")(/*options*/);
const cn = {
    host: '192.168.1.86',
    port: 5432,
    database: 'dev',
    user: 'postgres',
    password: '860315'
  };

  export const db = pgp(cn);