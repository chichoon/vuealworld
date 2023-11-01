import type { Email, URLString, Password, Username, Text } from '@/00_domain/common/value';

export interface EditUserData {
  email?: Email;
  password?: Password;
  username?: Username;
  bio?: Text;
  image?: URLString;
}
