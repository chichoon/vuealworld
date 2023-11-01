import type { Email, URLString, JWTToken, Username, Text } from '../common/value';

interface User {
  username: Username;
  bio: Text;
  image: URLString;
}

export interface UserData extends User {
  email: Email;
  token: JWTToken;
}

export interface ProfileData extends User {
  following: boolean;
}
