
import b64 from './digits';

/*globals atob, Buffer*/

// Modern browsers have atob and btoa defined
export const atobBrowser = typeof atob == 'function' && atob;

// Node.js
export function atobNode(data) { return Buffer.from(data, 'base64').toString('binary'); }

// Out custom implementation (polyfill)
var b64i;
const wsReg = /[\t\n\r\x20\x0C]+/g;
const chr = String.fromCharCode;
// if ( typeof chr.bind == 'function' ) chr = chr.bind(String);

/**
 * Decodes UTF8 or byte string
 *
 * @param {String} data
 */
export function atobJS(data) {
    if (!data) return data;
    data = String(data).replace(wsReg, '');

    var o1, o2, o3, h1, h2, h3, h4, bits
    ,   l = data.length
    ,   i = 0
    ,   ac = 0
    ,   dec = ''
    ,   tmp_arr = []
    ;
    if(b64i == undefined) {
        b64i = {};
        for(var j = 0, bl = b64.length; j < bl; j++) b64i[b64.charAt(j)] = j;
    }

    do {
        // unpack four hexets into three octets using index points in b64
        h1 = b64i[data.charAt(i++)];
        h2 = b64i[data.charAt(i++)];
        h3 = b64i[data.charAt(i++)];
        h4 = b64i[data.charAt(i++)];

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = chr(o1);
        }
        else if (h4 == 64) {
            tmp_arr[ac++] = chr(o1, o2);
        }
        else {
            tmp_arr[ac++] = chr(o1, o2, o3);
        }
    } while (i < l);

    dec = tmp_arr.join('');

    return dec.replace(/\0+$/, '');
}

const _atob = atobBrowser || typeof Buffer == 'function' && atobNode || atobJS;

export default _atob;
