/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
const getToken = (accessKey, secretKey, putPolicy) => {
    const putPolicyString = JSON.stringify(putPolicy);
    const encoded = base64encode(utf16to8(putPolicyString));
    const hash = CryptoJS.HmacSHA1(encoded, secretKey);
    const encodedSigned = hash.toString(CryptoJS.enc.Base64);
    const uploadToken = accessKey + ':' + safe64(encodedSigned) + ':' + encoded;
    return uploadToken;
};
function utf16to8(str) {
    let out = '';
    const len = str.length;
    let c;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i);
        }
        else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | (c & 0x3f));
        }
        else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | (c & 0x3f));
        }
    }
    return out;
}
const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function base64encode(str) {
    let out = '';
    const len = str.length;
    let i = 0;
    let c1;
    let c2;
    let c3;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += '==';
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xf) << 2);
            out += '=';
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return out;
}
const safe64 = function (base64) {
    base64 = base64.replace(/\+/g, '-');
    base64 = base64.replace(/\//g, '_');
    return base64;
};

export { getToken };
