export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface EditUserData {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface AuthorData {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface UserData {
  email: string;
  token?: string;
  id?: number;
  username: string;
  bio: string;
  image: string;
}
