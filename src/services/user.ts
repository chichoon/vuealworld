import type { SignUpData, SignInData, EditUserData } from '@/types/userData';
import { httpClient } from './httpClient';

function postRegister({ email, password, username }: SignUpData) {
  return httpClient({ url: '/users', method: 'POST', body: { user: { email, password, username } } });
}

function postLogin({ email, password }: SignInData) {
  return httpClient({ url: '/users/login', method: 'POST', body: { user: { email, password } } });
}

function get() {
  return httpClient({ url: '/user', method: 'GET' });
}

function put({ email, password, username, bio, image }: EditUserData) {
  return httpClient({ url: '/user', method: 'PUT', body: { user: { email, password, username, bio, image } } });
}

export default { postRegister, postLogin, get, put };
