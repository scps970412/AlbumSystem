import { db } from "./../app";
import { User } from "./../models/user";

const { ParameterizedQuery: PQ } = require("pg-promise");

class UserService {
  add(user: User): boolean {
    const addUser = new PQ(
      "INSERT INTO public.user(userid, password, email, isdelete) VALUES($1, $2, $3, false)"
    );
    addUser.values = [user.userId, user.password, user.email];
    db.none(addUser)
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        //加入log檔
        console.log(error);
      });
    return false;
  }
}

export default new UserService();
