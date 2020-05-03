import Session from './session';
import Local from './local';
import Cookies from './cookies';
import isEmpty from './isEmpty';
import isObject from './isObject';
import uuid from './uuid';
declare const API: {
    Local: {
        get: (key: string) => any;
        set: (key: string, dataSource?: string, second?: number) => object;
        remove: (key: string) => void;
        clear: () => void;
        key: (n: number) => string;
    };
    Session: {
        get: (key: string) => any;
        set: (key: string, dataSource?: string, second?: number) => any;
        remove: (key: string) => void;
        clear: () => void;
        key: (n: number) => string;
    };
    Cookies: {
        set: (cname: string, cvalue: string, second?: number) => void;
        get: (cname: string) => string;
        remove: (cname: string) => void;
    };
    isEmpty: (input: any) => boolean;
    isObject: (input: any) => boolean;
    uuid: typeof uuid;
};
export default API;
export { Local, Session, Cookies, isEmpty, isObject, uuid };
