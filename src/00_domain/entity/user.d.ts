import type { Email, ID, URLString, JWTToken, Username } from '../common/value';

export interface UserData {
  email: Email;
  token?: JWTToken;
  id?: ID;
  username: Username;
  bio: string;
  image: URLString;
}
