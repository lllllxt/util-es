'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = new Array(32);
    var rnd = 0;
    var r = void 0;
    for (var i = 0; i < 32; i++) {
        if (i === 12) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];
        }
    }
    return uuid.join('');
};

;