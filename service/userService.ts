import { db } from "./../app";
import { User } from "./../models/user";

const { ParameterizedQuery: PQ } = require("pg-promise");

class UserService {
  add(user: User): boolean {
    const addUser = new PQ(
      "INSERT INTO public.user(userid, password, email, isdelete) VALUES($1, $2, $3, false)"
    );
    addUser.values = [user.userId, user.password, user.email];
    let isAdd = db
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

  checkUserId(userId: string): boolean {
    const checkUserId = new PQ(
      "SELECT count(*) FROM public.user WHERE userid = $1 AND  isdelete = false"
    );
    checkUserId.values = [userId];
    let isExist = db
      .oneOrNone(checkUserId)
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

  checkEmail(email: string): boolean {
    const checkEmail = new PQ(
      "SELECT count(*) FROM public.user WHERE email = $1 AND  isdelete = false"
    );
    checkEmail.values = [email];
    let isExist = db
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

  checkLogin(user: User): boolean {
    const checkEmail = new PQ(
      "SELECT count(*) FROM public.user WHERE userid = $1 AND password = $2 AND  isdelete = false"
    );
    checkEmail.values = [user.userId, user.password];
    let isExist = db
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
}

export default new UserService();
