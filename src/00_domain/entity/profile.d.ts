import type { Text, URLString, Username } from '../common/value';

export interface ProfileData {
  username: Username;
  bio: Text;
  image: URLString;
  following: boolean;
}
