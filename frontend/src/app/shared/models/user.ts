export class User {

  constructor(
    public id: number,
    public username: string,
    public password: string, //rename here or backend
    public email: string,
    public role: number
  ) {
  }

}
