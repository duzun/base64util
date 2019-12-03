
import b64 from './digits';

/*globals btoa, Buffer*/

// Modern browsers have atob and btoa defined
export const btoaBrowser = typeof btoa == 'function' && btoa;

// Node.js
export function btoaNode(data) { return Buffer.from(data, 'binary').toString('base64'); }

// Out custom implementation (polyfill)

/**
 * Encodes UTF8 or byte string
 *
 * @param {String} data
 */
export function btoaJS(data) {
    if (!data) return data;

    var o1, o2, o3, h1, h2, h3, h4, bits
    ,   i = 0
    ,   ac = 0
    ,   enc = ''
    ,   tmp_arr = []
    ;
    do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

const _btoa = btoaBrowser || typeof Buffer == 'function' && btoaNode || btoaJS;

export default _btoa;
