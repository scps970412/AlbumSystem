export class User {
  id: number;
  userId: string;
  email: string;
  password: string;
  isdelete: boolean;

  constructor() {
    this.id = 0;
    this.userId = "";
    this.email = "";
    this.password = "";
    this.isdelete = false;
  }
}
