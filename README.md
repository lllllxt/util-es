# util-es

JavaScript常用方法


> *非常抱歉, 因操作失误导致npm上` v0.1.10 `以前版本全都没了, 之后的版本完全兼容以前的写法, 请放心食用 orz*


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
[Session](#session-&-local) | 对sessionStorage的封装
[Local](#session-&-local) | 对localStorage的封装
[Cookie](#cookie) | 对document.cookie的封装

###### Session & Local

- 可以直接存储```{}```和```[]```
- 可以设置过期时长

方法 | 描述
---|---
Session.get(String key) | 获取对应key的session
Session.set(String key, * value, Number second) | 设置session, second(非必传 单位: 秒)
Session.remove(String key) | 移除对应key的session
Session.key(Number key) | 获取对应索引的键名
Session.clear() | 移除所有session

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
isObject(* param) | 判断传入数据是否为对象 ( 不包含```null```和```undefined``` ), 返回 Boolean
uuid(Boolean bar) | 生成并返回一个uuid ( bar：是否带 ```-```，默认false )


## 其他
有问题欢迎交流, 轻喷 :bow:

欢迎PR或提交issues :smiley:

## License
This project is licensed under the MIT License
