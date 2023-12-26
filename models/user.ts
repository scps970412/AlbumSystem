const { body } = require("express-validator");

export class User {
  id: number;
  account: string;
  email: string;
  password: string;
  isdelete: boolean;

  constructor() {
    this.id = 0;
    this.account = "";
    this.email = "";
    this.password = "";
    this.isdelete = false;
  }
}
export default User;

export const userValidate = [
  body("account")
    .notEmpty()
    .withMessage("請輸入帳號")
    .isLength({ max: 20 })
    .withMessage("帳號不可超過 20 字元"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("請輸入信箱")
    .isEmail()
    .withMessage("請輸入正確的信箱格式")
    .isLength({ max: 20 })
    .withMessage("信箱不可超過 30 字元"),

  body("password")
    .notEmpty()
    .withMessage("請輸入密碼")
    .isLength({ min: 8, max: 16 })
    .withMessage("密碼必須 8 ~16 字元")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage("密碼必須包含英文大小寫"),
];
