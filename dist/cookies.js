'use strict';

var setCookie = function setCookie(cname, cvalue, second) {
    var d = new Date();
    d.setTime(d.getTime() + second * 1000);
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};

var getCookie = function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
};

var delCoolie = function delCoolie(cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

module.exports = {
    set: setCookie,
    get: getCookie,
    remove: delCoolie
};