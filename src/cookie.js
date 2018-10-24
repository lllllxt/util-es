const setCookie = function (cname, cvalue, second) {
    const d = new Date();
    d.setTime(d.getTime() + (second * 1000));
    const expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}

const getCookie = function (cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
}

const delCoolie = function (cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

module.exports = {
    set: setCookie,
    get: getCookie,
    remove: delCoolie
}