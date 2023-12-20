export class Photo {
  id: number;
  albumId: number;
  fileName: string;
  descripthion: string;
  constructor(
    id:number=0,
    albumId: number = 0,
    fileName: string = "",
    descripthion: string = ""
  ) {
    this.id = id;
    this.albumId = albumId;
    this.fileName = fileName;
    this.descripthion = descripthion;
  }
}
