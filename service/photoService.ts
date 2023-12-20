import { pgp, db } from "../app";
import { Photo } from "../models/photo";

const { ParameterizedQuery: PQ } = require("pg-promise");

class PhotoService {
  add(photos: Photo): boolean {
    const addPhoto = pgp.helpers.insert(photos, null, "photo");
    let isAdd = db
      .none(addPhoto)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return isAdd;
  }
}

export default new Photo();
