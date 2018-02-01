import Cookies from 'js-cookie'
import store from '@/store'
import {getSessionStore, setSessionStore} from '@/util/yun.js'
const TokenKey = 'x-access-token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return getSessionStore('token');
}

export function setToken(token) {
  //  return Cookies.set(TokenKey, token)
  return setSessionStore('token',token);
}

export function removeToken() {
   return Cookies.remove(TokenKey)
}
