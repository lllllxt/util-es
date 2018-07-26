/**
 * [判空]
 * @param  {String |Object |Array |Number}  para [null]
 * @return {Boolean}      [true | false]
 */
function isEmpty(para) {
    if (typeof(para) === "undefined") {
        return true;
    } else if (typeof(para) === "string") {
        return (para.trim() === '');
    } else if (para instanceof Array) {
        return (para.length === 0);
    } else if (para instanceof Date) {
        return false;
    } else if (typeof(para) === "object" && !(para instanceof Array)) {
        var para_name;
        for (para_name in para) {
            return false;
        }
        return true;
    } else if (typeof(para) === "number") {
        return isEmpty(para + '');
    }
}
// isEmpty(132);

/**
 * 获取url上的参数
 * @returns {Object}
 * @constructor
 */
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var requestList = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var para = strs[i].split("=");
            requestList[para[0]] = decodeURI(para[1]);
        }
    }
    return requestList;
}
// GetRequest()['id'];

/**
 * 判断是否微信浏览器
 * @returns {Boolean}
 */
function isWeChatBorder() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
//isWeChatBorder()

/**
 * [onlyNum input输入框只能输数字]
 *
 * @param  {Object} event [NOT NULL，不传会导致不兼容firefox和ie]
 * @param  {Number} length [小数点位数，为空时默认没有小数]
 * @return {Boolean}       [description]
 *
 *  example:
 *  <input type="text" onkeydown="return onlyNum(event,true);" onkeyup="this.value=this.value.replace(/[\u4e00-\u9fa5]|[(~！@#￥%……&*（）——+{}：“《》？、。，‘’；】【\-)+]/g,'')" 
    onpaste="return false" ondrop="return false" required>
 *
 *  onkeydown不加return会导致不兼容firefox/ie
 *
 */
function onlyNum(event, length) {
    var input = event.target.value;
    var point = (length === undefined || /\./.exec(input)) ? 0 : 1;

    var e = (event) ? event : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象
    var key = e.keyCode ? e.keyCode : e.which; //兼容IE和Firefox获得keyBoardEvent对象的键值

    if (e.shiftKey) { //shift + any key
        e.returnValue = false;
        return false;
    }

    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (point && (key == 190 || key == 110))) { // 数字键
    } else if (key == 8 || key == 9 || key == 13 || (key >= 37 && key <= 40 || key == 46)) { //功能键
    } else {
        e.returnValue = false;
        return false;
    }

    if (input.indexOf('.') != -1) {
        var decimal = input.substring(input.indexOf('.') + 1);
        if (decimal.length >= length) {
            if (key == 8 || key == 9 || key == 13 || (key >= 37 && key <= 40 || key == 46)) { //功能键
            } else {
                e.returnValue = false;
                return false;
            }
        }
    }
}

/**
 * 获取sessionStorage
 * @param key
 * @returns {any}
 */
function getSession(key) {
    let result = null;
    let _session = JSON.parse(sessionStorage.getItem(key));
    let isObj = Object.prototype.toString.call(_session) === '[object Object]';
    if (isObj && _session.$$ExpiryTime) {
        if ((new Date().getTime() > new Date(_session.$$ExpiryTime).getTime())) { // 过期
            result = null;
        } else {
            result = _session.data;
        }
    } else {
        result = _session;
    }
    return result;
};

/**
 * 设置sessionStorage (可存对象)
 * @param key 键值
 * @param dataSource 数据
 * @param second 过期时间(s)
 * @returns {any}
 */
function setSession(key, dataSource, second) {
    let result = {};
    if (second) {
        const d = new Date();
        d.setTime(d.getTime() + (second * 1000));
        result.data = dataSource;
        result.$$ExpiryTime = d;
    } else {
        result = dataSource;
    }
    sessionStorage.setItem(key, JSON.stringify(result));
    return result;
};

/**
 * 移除sessionStorage
 * @param key
 */
function removeSession(key) {
    key && sessionStorage.removeItem(key);
};

/**
 * [formatStr
 *
 * 		对Date的扩展，将 Date 转化为指定格式的String
 * 		月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 		年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 		例子：
 * 		(new Date()).formatStr("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * 		(new Date()).formatStr("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * ]
 *
 * @param  {String} fmt [指定格式的String]
 * @return {String}     [指定格式的String]
 */
Date.prototype.formatStr = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * [在ios10上，为了提高Safari中网站的辅助功能，即使网站在视口中设置了user-scalable = no，用户也可以手动缩放。解决方案：添加监听事件来阻止缩放]
 * @return {[type]} [description]
 */
window.onload = function() {
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};

/**
 * https://segmentfault.com/q/1010000004323418
 *
 * [图片压缩]
 *
 * @param  {File} file [文件流]
 * @param  {Object} option [quality 图片品质，times 图片大小倍数]
 * @return {function} callback [回调函数，参数(err,data) data是Blob 对象]
 *
 *  example:
 *    compressImg(file, { quality: .5, times: .5 }, function(err, data) => {}
 *
 * PS:
 * canvas.toDataURL 只能压缩image/jpeg 或 image/webp... (quality)
 * 其他格式可以通过修改图片大小以达到压缩效果 (times)
 */
function compressImg(file, option, callback) {

    var OPT = {
        quality: .92,
        times: 1
    }
    Object.assign(OPT, option)

    if (!window.FileReader || !window.Blob) {
        return errorHandler('您的浏览器不支持图片压缩')();
    }

    var reader = new FileReader();
    var mimeType = file.type || 'image/jpeg';

    reader.onload = createImage;
    reader.onerror = errorHandler('图片读取失败！');
    reader.readAsDataURL(file);

    function createImage() {
        var dataURL = this.result;
        var image = new Image();
        image.onload = compressImage;
        image.onerror = errorHandler('图片加载失败');
        image.src = dataURL;
    }

    function compressImage() {
        var canvas = document.createElement('canvas');
        var ctx;
        var dataURI;
        var result;

        canvas.width = this.naturalWidth * OPT.times;
        canvas.height = this.naturalHeight * OPT.times;
        ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        dataURI = canvas.toDataURL(mimeType, option.quality);
        result = dataURIToBlob(dataURI);

        callback(null, result);
    }

    function dataURIToBlob(dataURI) {
        var type = dataURI.match(/data:([^;]+)/)[1];
        var base64 = dataURI.replace(/^[^,]+,/, '');
        var byteString = atob(base64);

        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {
            type: type
        });
    }

    function errorHandler(message) {
        return function() {
            var error = new Error('Compression Error:', message);
            callback(error, null);
        };
    }
}

/**
 * 不改变内存地址的深拷贝,用法和Object.assgin(target,...source)一样
 *
 * @argument target The target object to copy to.
 * @argument source The source object from which to copy properties.
 * @description 用于解决普通深拷贝 拷贝对象数组,或函数组的对象时,vue视图数据数据无法实时改变问题
 * @author liuxiaotang
 * @since 2018/04/20
 *
 */
function _assign() {
    function _copy(arg1, arg2) {
        if (arg1 === null || typeof arg1 === 'undefined') {
            // arg1 不能为null或undefined
            console.error('第一个参数不能为null或undefined')
            arg1 = undefined
            return arg1
        } else if (typeof arg1 !== typeof arg2) {
            // arg1 与 arg1 类型不一致时,arg1不变
            return arg1
        } else {
            for (const i in arg2) {
                if (arg2.hasOwnProperty(i)) {
                    if (typeof arg2[i] === 'object') {
                        if (arg1[i] !== null && typeof arg1[i] === 'object') {
                            // arg1[i]不为 null 且为Object时,递归
                            _copy(arg1[i], arg2[i])
                        } else {
                            // arg1[i]为 null 或不为Object时
                            arg1[i] = arg2[i]
                        }
                    } else {
                        arg1[i] = arg2[i]
                    }
                }
            }
            return arg1
        }
    }

    const args = arguments
    if (args[0] === null || typeof args[0] === 'undefined') {
        // args[0] 不能为null或undefined
        console.error('第一个参数不能为null或undefined')
        args[0] = undefined
        return args[0]
    } else {
        let len = args.length
        while (len > 0) {
            args[len - 1] = _copy(args[len - 1], args[len])
            len--
        }
        return args[0]
    }
}
