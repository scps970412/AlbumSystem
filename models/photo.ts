export class Photo {
  id: number;
  albumid: number;
  filename: string;
  description: string;
  constructor(
    id: number = 0,
    albumid: number = 0,
    filename: string = "",
    descripthion: string = ""
  ) {
    this.id = id;
    this.albumid = albumid;
    this.filename = filename;
    this.description = descripthion;
  }
}
export default Photo;
