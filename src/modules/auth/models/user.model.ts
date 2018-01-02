export interface IUserModule {
  user: IUser
}

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  loading?: boolean;
  error?: any;
}

export class User {
  constructor(
    public uid: string, 
    public email: string, 
    public role: string,
    public displayName: string,
    public loading?: boolean,
  ) { }
}