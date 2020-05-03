    /** 判断传入数据是否为空字符或对象 ( {} [] Map Set), 返回 Boolean */
export function isEmpty(input: any): boolean
declare namespace util {
    /** 判断传入数据是否为空字符或对象 ( {} [] Map Set), 返回 Boolean */
    function isEmpty(input: any): boolean

    /** 判断输入参数是否为对象(不包含null和undefined) */
    function isObject(input: any): boolean

    /**
     * 返回一个uuid
     * @param { boolean } bar 是否带“-” 默认false
     *  */
    function uuid(bar: boolean): string

    interface Session {
        /**
         * 获取对应key的session
         * @param key 键值
         * @returns {any}
         */
        get(key: string): any
        /**
         * 设置sessionStorage (可存对象)
         * @param key 键值
         * @param dataSource 数据
         * @param second 过期时间(s)
         * @returns {any}
         */
        set(key: string, data: any, second?: number): any
        /**
         * 移除对应key的session
         * @param key 键值
         */
        remove(key: string): void
        /** 清空sessionStorage */
        clear(): void
        /** 获取session中第n+1个的key */
        key(n: number): string
    }

    interface Local {
        /**
         * 获取对应key的localStorage
         * @param key 键值
         * @returns {any}
         */
        get(key: string): any
        /**
         * 设置localStorage (可存对象)
         * @param key 键值
         * @param dataSource 数据
         * @param second 过期时间(s)
         * @returns {any}
         */
        set(key: string, data: any, second?: number): any
        /**
         * 移除对应key的localStorage
         * @param key 键值
         */
        remove(key: string): void
        /** 清空localStorage */
        clear(): void
        /** 获取localStorage中第n+1个的key */
        key(n: number): string
    }

    interface Cookies {
        /**
         * 获取对应key的cookies
         * @param cname 键值
         * @returns {string}
         */
        get(cname: string): string
        /**
         * 设置cookies
         * @param cname 键值
         * @param dataSource 数据
         * @param second 过期时间(s)
         * @returns {any}
         */
        set(cname: string, cvalue: string, second?: number): any
        /**
         * 移除对应cname的cookies
         * @param cname 键值
         */
        remove(cname: string): void
    }
}
export default util
export as namespace util

declare module 'util' {
    export = util
}
