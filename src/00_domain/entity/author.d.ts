import type { Text, URLString, Username } from '../common/value';

export interface AuthorData {
  username: Username;
  bio: Text;
  image: URLString;
  following: boolean;
}
