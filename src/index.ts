import Session from './session'
import Local from './local'
import Cookies from './cookies'

import isEmpty from './isEmpty'
import isObject from './isObject'
import uuid from './uuid'
const API = { Local, Session, Cookies, isEmpty, isObject, uuid }

export default API
export { Local, Session, Cookies, isEmpty, isObject, uuid }
