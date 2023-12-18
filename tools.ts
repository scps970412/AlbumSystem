import fs from "fs";
import fsPromises = fs.promises;

class File {
  /**
   * 检查文件是否存在。
   * @param path 文件路径。
   * @returns 如果文件存在則返回 true，否则返回 false。
   */
  isExist(path: string): boolean {
    return fs.existsSync(path);
  }

  /**
   * 新增資料夾
   * @param path 文件路径。
   * @param folderName 資料夾名稱。
   * @returns 成功則返回 true，否则返回 false。
   */
  async createFolder(path: string, folderName: string): Promise<boolean> {
    let isCreate = await fsPromises
      .mkdir(`${path}/${folderName}`)
      .then(function () {
        return true;
      })
      .catch(function () {
        return false;
      });
    return isCreate;
  }

  /**
   * 檔案重新命名
   * @param path 文件路径。
   * @param fileName 欲變更檔案名稱。
   * @param newFileName 變更後檔案名稱。
   * @returns 成功則返回 true，否则返回 false。
   */
  rename(path: string, fileName: string, newFileName: string): boolean {
    let isExist: Boolean = this.isExist(`${path}/${fileName}`);
    if (!isExist) {
      console.log("欲變更檔案或目錄不存在");
      return false;
    }

    if (
      this.getFilenameExtension(fileName) !=
      this.getFilenameExtension(newFileName)
    ) {
      console.log("副檔名不可以變更");
      return false;
    }

    isExist = this.isExist(`${path}/${newFileName}`);
    if (isExist) {
      console.log("新名稱已重複");
      return false;
    }

    fs.rename(`${path}/${fileName}`, `${path}/${newFileName}`, (err) => {
      if (err != null) {
        console.log(err);
      }
    });

    return true;
  }

  /**
   * 刪除目錄 ※包含目錄底下所有檔案
   * @param path 欲刪除目錄。
   * @param 成功則返回 true，目錄不存在則返回 false。
   */
  deleteDir(path: string): boolean {
    if (this.isExist(path)) {
      fs.rm(path, { recursive: true }, (err) => {
        if (err != null) {
          console.log(err);
        }
      });
      return true;
    } else {
      return false;
    }
  }

  /**
   * 刪除檔案
   * @param path 檔案目錄。
   * @param fileName 檔案名稱。
   * @returns 成功則返回 true，檔案或路徑不存在返回 false。
   */
  deleteFile(path: string, fileName: string) {
    if (this.isExist(`${path}/${fileName}`)) {
      fs.unlinkSync(`${path}/${fileName}`);
      return true;
    } else {
      return false;
    }
  }

  getFilenameExtension(fileName: string): string {
    let temp: string[] = fileName.split(".");
    if (temp.length == 2) {
      return temp[1];
    } else {
      return temp[0];
    }
  }
}

export default new File();
