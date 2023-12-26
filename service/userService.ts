import { db } from "./../app";
import User from "./../models/user";

const { ParameterizedQuery: PQ } = require("pg-promise");

class UserService {
  async add(user: User): Promise<boolean> {
    const addUser = new PQ(
      "INSERT INTO public.user(account, password, email, isdelete) VALUES($1, $2, $3, false)"
    );
    addUser.values = [user.account, user.password, user.email];
    let isAdd = await db
      .none(addUser)
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        //加入log檔
        return false;
        console.log(error);
      });
    return isAdd;
  }

  async checkAccount(account: string): Promise<boolean> {
    const checkAccount = new PQ(
      "SELECT count(*) FROM public.user WHERE account = $1 AND  isdelete = false"
    );
    checkAccount.values = [account];
    let isExist = await db
      .oneOrNone(checkAccount)
      .then((result: any) => {
        if (result.count > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return isExist;
  }

  async checkEmail(email: string): Promise<boolean> {
    const checkEmail = new PQ(
      "SELECT count(*) FROM public.user WHERE email = $1 AND  isdelete = false"
    );
    checkEmail.values = [email];
    let isExist = await db
      .oneOrNone(checkEmail)
      .then((result: any) => {
        if (result.count > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return isExist;
  }

  async checkLogin(user: User): Promise<User> {
    const checkEmail = new PQ(
      "SELECT id, account FROM public.user WHERE account = $1 AND password = $2 AND  isdelete = false"
    );
    checkEmail.values = [user.account, user.password];
    let userResult = await db
      .oneOrNone(checkEmail)
      .then((result: any) => {
        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return userResult;
  }
}

export default new UserService();
