import type { Email, Password, Username } from '@/00_domain/common/value';

export interface SignUpData {
  username: Username;
  email: Email;
  password: Password;
}

export interface SignInData {
  email: Email;
  password: Password;
}
