import { db } from "./../app";
import { Album } from "./../models/album";

const { ParameterizedQuery: PQ } = require("pg-promise");

class AlbumService {
  add(album: Album): boolean {
    const addAlbum = new PQ(
      "INSERT INTO public.album(userid, title) VALUES($1, $2)"
    );
    addAlbum.values = [album.userId, album.title];
    let isAdd = db
      .none(addAlbum)
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

  update(album: Album): boolean {
    const updateAlbum = new PQ(
      `UPDATE public.album
       SET  title=$2
       WHERE id = $1;`
    );
    updateAlbum.values = [album.id, album.title];
    let isUpdate: boolean = db
      .result(updateAlbum)
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

  delete(album: Album): boolean {
    const deleteAlbum = new PQ(
      `DELETE FROM public.album
        WHERE id = $1;`
    );
    deleteAlbum.values = [album.id];
    let isDelete: boolean = db
      .result(deleteAlbum)
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

  checkTitle(album: Album): Album {
    const checkTitle = new PQ(
      `SELECT * FROM public.album 
       WHERE userid = $1 AND title = $2`
    );
    checkTitle.values = [album.userId, album.title];
    let dbAlbum = db
      .oneOrNone(checkTitle)
      .then((result: any) => {
        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return dbAlbum;
  }

  getById(album: Album): Album {
    const pq = new PQ(
      `SELECT * FROM public.album
       WHERE id = $1`
    );
    pq.values = [album.id];
    let dbAlbum = db
      .oneOrNone(pq)
      .then((result: any) => {
        console.log(result);

        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return dbAlbum;
  }
}

export default new AlbumService();
