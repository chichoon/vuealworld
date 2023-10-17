import { SignUpData, SignInData, EditUserData } from '@/types/userData';
import { httpClient } from './httpClient';

export function postUserRegister({ email, password, username }: SignUpData) {
  return async function () {
    httpClient({ url: '/users', method: 'POST', body: { email, password, username } });
  };
}

export function postUserLogin({ email, password }: SignInData) {
  return async function () {
    httpClient({ url: '/users/login', method: 'POST', body: { email, password } });
  };
}

export function getUser() {
  return async function () {
    httpClient({ url: '/user', method: 'GET' });
  };
}

export function putUser({ email, password, username, bio, image }: EditUserData) {
  return async function () {
    httpClient({ url: '/user', method: 'PUT', body: { email, password, username, bio, image } });
  };
}
