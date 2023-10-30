import type { SignUpData, SignInData } from '@/01_application/ports/auth';
import type { EditUserData } from '@/01_application/ports/user';
import { httpClient } from './httpClient';

function postRegister({ email, password, username }: SignUpData) {
  return httpClient({ url: '/users', method: 'POST', body: { user: { email, password, username } } }).then(
    (data) => data.user,
  );
}

function postLogin({ email, password }: SignInData) {
  return httpClient({ url: '/users/login', method: 'POST', body: { user: { email, password } } }).then(
    (data) => data.user,
  );
}

function get() {
  return httpClient({ url: '/user', method: 'GET' }).then((data) => data.user);
}

function put({ email, password, username, bio, image }: EditUserData) {
  return httpClient({ url: '/user', method: 'PUT', body: { user: { email, password, username, bio, image } } });
}

export default { postRegister, postLogin, get, put };
