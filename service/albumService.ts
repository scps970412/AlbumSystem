import { db } from "./../app";
import Album from "./../models/album";

const { ParameterizedQuery: PQ } = require("pg-promise");

class AlbumService {
  async add(album: Album): Promise<boolean> {
    const addAlbum = new PQ(
      "INSERT INTO public.album(userid, title) VALUES($1, $2)"
    );
    addAlbum.values = [album.userid, album.title];
    let isAdd = await db
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

  async update(album: Album): Promise<boolean> {
    const updateAlbum = new PQ(
      `UPDATE public.album
       SET  title=$2
       WHERE id = $1;`
    );
    updateAlbum.values = [album.id, album.title];
    let isUpdate: boolean = await db
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

  async delete(album: Album): Promise<boolean> {
    const deleteAlbum = new PQ(
      `DELETE FROM public.album
        WHERE id = $1;`
    );
    deleteAlbum.values = [album.id];
    let isDelete: boolean = await db
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

  async checkTitle(album: Album): Promise<Album> {
    const checkTitle = new PQ(
      `SELECT * FROM public.album 
       WHERE userid = $1 AND title = $2`
    );
    checkTitle.values = [album.userid, album.title];
    let dbAlbum = await db
      .oneOrNone(checkTitle)
      .then((result: any) => {
        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return dbAlbum;
  }

  async getById(id: number): Promise<Album> {
    const pq = new PQ(
      `SELECT id, userid, title FROM public.album
       WHERE id = $1`
    );
    pq.values = [id];
    let dbAlbum = await db
      .oneOrNone(pq)
      .then((result: any) => {
        return result;
      })
      .catch((error: Error) => {
        console.log(error);
      });
    console.log(dbAlbum);

    return dbAlbum;
  }
}

export default new AlbumService();
