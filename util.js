/**
 * [判空]
 * @param  {String |Object |Array}  para [null]
 * @return {Boolean}      [true | false]
 */
function isEmpty(para) {
    if (typeof(para) === "undefined") {
        return true;
    } else if (typeof(para) === "string") {
        return (para === '' || para === undefined) ? true : false;
    } else if (para instanceof Array) {
        return (para.length == 0) ? true : false;
    } else if (typeof(para) === "object" && !(para instanceof Array)) {
        var para_name;
        for (para_name in para) {
            return false;
        }
        return true;
    } else if (typeof(para) === "number") {
        throw('The function isEmpty(para) : "para" can not be number!');
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
function isWeChatBorder(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
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
 *  <input type="text" onkeydown="return onlyNum(event,true);" required>
 *
 *  onkeydown不加return会导致不兼容firefox/ie
 *
 */
function onlyNum(event,length){
    var input = event.target.value;
    var point= (length === undefined || /\./.exec(input)) ? 0 : 1;

    var e = (event) ? event : ((window.event) ? window.event : "");//兼容IE和Firefox获得keyBoardEvent对象
    var key = e.keyCode?e.keyCode:e.which;//兼容IE和Firefox获得keyBoardEvent对象的键值

    if( e.shiftKey) { //shift + any key
        e.returnValue=false;
        return false;
    }

    if((key>=48 && key<=57) || (key>=96 && key<=105) || (point && (key==190||key==110))){ // 数字键
    }else if(key==8||key==9||key==13||(key>=37&&key<=40||key==46)){//功能键
    }else{
        e.returnValue=false;
        return false;
    }

    if (input.indexOf('.')!=-1) {
        var decimal = input.substring(input.indexOf('.') + 1);
        if (decimal.length >= length){
            if(key==8||key==9||key==13||(key>=37&&key<=40||key==46)){//功能键
            }else{
                e.returnValue=false;
                return false;
            }
        }
    }
}

function getSessionJson(key) {
    isEmpty(sessionStorage.getItem(key))?sessionStorage.setItem(key,JSON.stringify({})):'';
    return JSON.parse(sessionStorage.getItem(key));
}
function setSessionJson(key,json) {
    sessionStorage.setItem(key,JSON.stringify(json)) ;
    return sessionStorage.getItem(key);
}
function removeSession(key) {
    if(!isEmpty(key))sessionStorage.removeItem(key);
}

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
Date.prototype.formatStr = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
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
window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false);
}
