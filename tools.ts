import fs from "fs";
import fsPromises = fs.promises;
const path = require("path");
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
   * @param filePath 文件路径。
   * @param folderName 資料夾名稱。
   * @returns 成功則返回 true，否则返回 false。
   */
  createFolder(filePath: string, folderName: string): boolean {
    if (
      this.isExist(filePath) &&
      !this.isExist(path.join(filePath, folderName))
    ) {
      fs.mkdir(path.join(filePath, folderName), (err) => {
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
   * 檔案重新命名
   * @param filePath 文件路径。
   * @param fileName 欲變更檔案名稱。
   * @param newFileName 變更後檔案名稱。
   * @returns 成功則返回 true，否则返回 false。
   */
  rename(filePath: string, fileName: string, newFileName: string): boolean {
    let isExist: Boolean = this.isExist(path.join(filePath, fileName));
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

    isExist = this.isExist(path.join(filePath, newFileName));
    if (isExist) {
      console.log("新名稱已重複");
      return false;
    }

    fs.rename(
      path.join(filePath, fileName),
      path.join(filePath, newFileName),
      (err) => {
        if (err != null) {
          console.log(err);
        }
      }
    );

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
   * @param filePath 檔案目錄。
   * @param fileName 檔案名稱。
   * @returns 成功則返回 true，檔案或路徑不存在返回 false。
   */
  deleteFile(filePath: string, fileName: string) {
    if (this.isExist(path.join(filePath, fileName))) {
      fs.unlinkSync(path.join(filePath, fileName));
      return true;
    } else {
      return false;
    }
  }

  /**
   * 複製檔案
   * @param filePath 欲複製檔案
   * @param toFilePath 新檔案路徑
   */
  copyFile(filePath: string, toFilePath: string) {
    fs.copyFile(filePath, toFilePath, fs.constants.COPYFILE_EXCL, (err) => {
      console.log(err);
    });
  }

  getFilenameExtension(fileName: string): string {
    let temp: string[] = fileName.split(".");
    if (temp.length == 2) {
      return temp[1];
    } else {
      return "";
    }
  }
}

export default new File();
