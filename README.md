# util-es

JavaScript常用方法

## 使用方法

### 通过npm安装
```
npm i util-es
```

```
import Util from 'util-es'
import { isEmpty, Session } from 'util-es'

const Util = request('util-es')
```


### 通过```<script>```标签引用
[util.min.js](https://github.com/lllllxt/util-es/blob/master/util.min.js)

此方法是向window对象中注册一个 ```util``` 对象

## 规则
- 驼峰命名的为方法
- 首写字母大写为对象

## 对象

对象名 | 描述
---|---
[Session](#session--local) | 对sessionStorage的封装
[Local](#session--local) | 对localStorage的封装
[Cookie](#cookie) | 对document.cookie的封装

###### Session & Local

- 可以直接存储```{}```和```[]```
- 可以设置过期时长

方法 | 描述
---|---
Session.get(String key) | 获取对应key的session
Session.set(String key, * value, Number second) | 设置session, second(非必传 单位: 秒)
Session.remove(String key) | 移除对应key的session
Local的方法与Session一致

:exclamation::exclamation:使用Session & Local存储对象时, 请勿使用```$$ExpiryTime```作为属性,这是设置过期时间的关键字

###### Cookie
单纯的对cookie封装, 仅支持存储字符串和设置时间
方法 | header 2
---|---
get(String key) | 获取对应key的Cookie
set(String key, * value, Number second) | 设置Cookie, second(非必传 单位: 秒)
remove(String key) | 移除对应key的Cookie


## 方法

方法 | 描述
---|---
isEmpty(* param) | 判断传入数据是否为空字符或对象 ( ```{}``` ```[]``` ```Map``` ```Set```), 返回 Boolean
uuid() | 生成并返回一个uuid(不带 ```-``` 的)


## Built With
* [browserify](https://www.npmjs.com/package/browserify)
* [uglifyjs](https://www.npmjs.com/package/uglify-js)

## 其他
第一次写工具, 有问题欢迎交流, 轻喷 :bow:

欢迎PR或提交issues :smiley:

## License
This project is licensed under the MIT License
