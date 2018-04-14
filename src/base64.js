/**
*  Base64 string encoding and decoding utility.
*
*  play @ https://duzun.me/playground/encode#base64Encode=Test%20String%20
*
*  original of _btoa and _atob by: Tyler Akins (http://rumkin.com)
*
*
*  @license MIT
*  @version 2.0.0
*  @umd AMD, Browser, CommonJs
*  @author Dumitru Uzun (DUzun.Me)
*/

export const VERSION = '2.0.0';

import _atob from './atob';
import _btoa from './btoa';
import { utf8Encode, utf8Decode } from './utf8';


// Decodes byte-string - 8bit per char - either btoa()'s return or byteUrlEncode()'s return
export function byteDecode(data) {
    let ret = data;
    if(ret) {
        ret = _atob(String(ret)
            .replace(/_/g, '/')
            .replace(/-/g, '+'))
        ;
    }
    return ret;
}

// Encode byte-string - 8bit per char - used for binary data
export { _btoa as byteEncode };

// Encodes multi-byte string as utf8 (common in JS)
export function mbEncode(data) {
    if(!data) return data;
    return _btoa(utf8Encode(data));
}

// Decodes to multi-byte string if utf8-encoded
export function mbDecode(data, force_utf8) {
    let ret = byteDecode(data);
    if(ret) {
        if(force_utf8) {
            return utf8Decode(ret);
        }
        else {
            try {
                ret = utf8Decode(ret);
            } catch(err) {}
        }
    }
    return ret;
}

// Encode for URL
export function byteUrlEncode(data) {
    let ret = _btoa(data);
    return ret && ret.replace(/\=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Decode from byteUrlEncode()
export function byteUrlDecode(data, force_utf8) {
    let ret = data;
    if(ret) {
        ret += '==='.substr(0, 3-(ret.length+3)%4);
        ret = byteDecode(ret, force_utf8);
    }
    return ret;
}

// Encode as base64 a multi-byte string as utf8 for URL
export function mbUrlEncode(data) {
    if(!data) return data;
    let ret = utf8Encode(data);
    return byteUrlEncode(ret);
}

// Decode base64 of utf8 encoded text to multi-byte string
export function mbUrlDecode(data) {
    let ret = byteUrlDecode(data);
    return ret && utf8Decode(ret);
}


// multi-byte string - common JS String - used for text data - get encoded/decoded to/from utf8
export { mbEncode as encode };
export { mbDecode as decode };

// multi-byte string - common JS String - used for text data - get encoded/decoded to/from utf8 for URL
export { mbUrlEncode as urlEncode };
export { mbUrlDecode as urlDecode };

export { utf8Encode as mb2utf8 };
export { utf8Decode as utf82mb };

export { _atob as _atob };
export { _btoa as _btoa };

// Make sure atob and btoa exists in the environment
export function polyfill(global) {
    if ( !global ) {
        global = typeof window == 'undefined' ? typeof global == 'undefined' ? typeof self == 'undefined' ? this : self : global : window;
    }
    if ( global ) {
        if ( typeof atob == 'undefined' ) {
            global.atob = _atob;
        }
        if ( typeof btoa == 'undefined' ) {
            global.btoa = _btoa;
        }
    }
}

export function bindProto(__) {
    const __ex = typeof Object.defineProperty == 'function'
          ? (name, func/*, proto*/) => {
              Object.defineProperty(/*proto||*/__, name, {
                  value: func,
                  configurable: true,
                  enumerable: false,
                  writeable: true
              });
          }
          : (name, func/*, proto*/) => {
              // Take care with (for ... in) on strings!
              (/*proto||*/__)[name] = func;
          }
    ;

    __ex('base64ByteEncode', function () { return _btoa(this); });
    __ex('base64ByteDecode', function () { return byteDecode(this); });

    __ex('base64Encode', function () { return mbEncode(this); });
    __ex('base64Decode', function () { return mbDecode(this); });

    __ex('base64ByteUrlEncode', function () { return byteUrlEncode(this); });
    __ex('base64ByteUrlDecode', function () { return byteUrlDecode(this); });

    __ex('base64UrlEncode', function () { return mbUrlEncode(this); });
    __ex('base64UrlDecode', function () { return mbUrlDecode(this); });
}

// Add String.prototype methods:
bindProto(String.prototype);
