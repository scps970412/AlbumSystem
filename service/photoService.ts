import { db } from "../app";
import Photo from "../models/photo";

const { ParameterizedQuery: PQ } = require("pg-promise");

class PhotoService {
  async add(photo: Photo): Promise<boolean> {
    const addPhoto = new PQ(
      "INSERT INTO public.photo(albumid, filename, description) VALUES($1, $2, $3)"
    );
    addPhoto.values = [photo.albumid, photo.filename, photo.description];
    let isAdd = await db
      .none(addPhoto)
      .then((result: any) => {
        console.log(result);

        return true;
      })
      .catch((error: Error) => {
        console.log(error);
        return false;
      });
    return isAdd;
  }

  async update(photo: Photo): Promise<boolean> {
    const updatePhoto = new PQ(
      `UPDATE public.photo
       SET  filename=$2,
            description = $3
       WHERE id = $1;`
    );
    updatePhoto.values = [photo.id, photo.filename, photo.description];
    let isUpdate: boolean = await db
      .result(updatePhoto)
      .then((result: any) => {
        if (result.rowCount > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return false;
      });
    return isUpdate;
  }

  async delete(photo: Photo): Promise<boolean> {
    const deletePhoto = new PQ(
      `DELETE FROM public.photo
        WHERE id = $1;`
    );
    deletePhoto.values = [photo.id];
    let isDelete: boolean = await db
      .result(deletePhoto)
      .then((result: any) => {
        if (result.rowCount > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return false;
      });
    return isDelete;
  }

  async getById(id: number): Promise<Photo> {
    const pq = new PQ(
      `SELECT id, albumid, filename, description FROM public.photo
       WHERE id = $1`
    );
    pq.values = [id];
    let dbPhoto = await db
      .oneOrNone(pq)
      .then((result: any) => {
        console.log(result);

        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return dbPhoto;
  }

  async deleteByAlbumId(albumId: number): Promise<boolean> {
    const pq = new PQ(
      `DELETE FROM public.photo
       WHERE albumid = $1`
    );
    pq.values = [albumId];
    let dbPhoto = await db
      .oneOrNone(pq)
      .then((result: any) => {
        console.log(result);

        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return dbPhoto;
  }
}

export default new PhotoService();
