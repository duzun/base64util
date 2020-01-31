(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.base64 = {}));
}(this, (function (exports) { 'use strict';

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /*globals atob, Buffer*/
    // Modern browsers have atob and btoa defined

    var atobBrowser = typeof atob == 'function' && atob; // Node.js

    function atobNode(data) {
      return Buffer.from(data, 'base64').toString('binary');
    } // Out custom implementation (polyfill)

    var b64i;
    var wsReg = /[\t\n\r\x20\x0C]+/g;
    var chr = String.fromCharCode; // if ( typeof chr.bind == 'function' ) chr = chr.bind(String);

    /**
     * Decodes UTF8 or byte string
     *
     * @param {String} data
     */

    function atobJS(data) {
      if (!data) return data;
      data = String(data).replace(wsReg, '');
      var o1,
          o2,
          o3,
          h1,
          h2,
          h3,
          h4,
          bits,
          l = data.length,
          i = 0,
          ac = 0,
          dec = '',
          tmp_arr = [];

      if (b64i == undefined) {
        b64i = {};

        for (var j = 0, bl = b64.length; j < bl; j++) {
          b64i[b64.charAt(j)] = j;
        }
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
        } else if (h4 == 64) {
          tmp_arr[ac++] = chr(o1, o2);
        } else {
          tmp_arr[ac++] = chr(o1, o2, o3);
        }
      } while (i < l);

      dec = tmp_arr.join('');
      return dec.replace(/\0+$/, '');
    }

    var _atob = atobBrowser || typeof Buffer == 'function' && atobNode || atobJS;

    /*globals btoa, Buffer*/
    // Modern browsers have atob and btoa defined

    var btoaBrowser = typeof btoa == 'function' && btoa; // Node.js

    function btoaNode(data) {
      return Buffer.from(data, 'binary').toString('base64');
    } // Out custom implementation (polyfill)

    /**
     * Encodes UTF8 or byte string
     *
     * @param {String} data
     */

    function btoaJS(data) {
      if (!data) return data;
      var o1,
          o2,
          o3,
          h1,
          h2,
          h3,
          h4,
          bits,
          i = 0,
          ac = 0,
          enc = '',
          tmp_arr = [];

      do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f; // use hexets to index into b64, and append result to encoded string

        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      enc = tmp_arr.join('');
      var r = data.length % 3;
      return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }

    var _btoa = btoaBrowser || typeof Buffer == 'function' && btoaNode || btoaJS;

    /*globals unescape, escape, decodeURIComponent, encodeURI*/
    /// Encode multi-byte into UTF-8 string
    function utf8Encode(str) {
      return unescape(encodeURI(str));
    } /// Decode UTF-8 string to multi-byte string

    function utf8Decode(str) {
      return decodeURIComponent(escape(str));
    }

    /**
    *  Base64 string encoding and decoding utility.
    *
    *  play @ https://duzun.me/playground/encode#base64Encode=Test%20String%20
    *
    *  original of _btoa and _atob by: Tyler Akins (http://rumkin.com)
    *
    *
    *  @license MIT
    *  @version 2.1.0
    *  @author Dumitru Uzun (DUzun.Me)
    */
    var VERSION = '2.1.0';

    function byteDecode(data) {
      var ret = data;

      if (ret) {
        ret = _atob(String(ret).replace(/_/g, '/').replace(/-/g, '+'));
      }

      return ret;
    } // Encode byte-string - 8bit per char - used for binary data

    function mbEncode(data) {
      if (!data) return data;
      return _btoa(utf8Encode(data));
    } // Decodes to multi-byte string if utf8-encoded

    function mbDecode(data, force_utf8) {
      var ret = byteDecode(data);

      if (ret) {
        if (force_utf8) {
          return utf8Decode(ret);
        } else {
          try {
            ret = utf8Decode(ret);
          } catch (err) {}
        }
      }

      return ret;
    } // Encode for URL

    function byteUrlEncode(data) {
      var ret = _btoa(data);

      return ret && ret.replace(/\=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
    } // Decode from byteUrlEncode()

    function byteUrlDecode(data, force_utf8) {
      var ret = data;

      if (ret) {
        ret += '==='.substr(0, 3 - (ret.length + 3) % 4);
        ret = byteDecode(ret);
      }

      return ret;
    } // Encode as base64 a multi-byte string as utf8 for URL

    function mbUrlEncode(data) {
      if (!data) return data;
      var ret = utf8Encode(data);
      return byteUrlEncode(ret);
    } // Decode base64 of utf8 encoded text to multi-byte string

    function mbUrlDecode(data) {
      var ret = byteUrlDecode(data);
      return ret && utf8Decode(ret);
    } // multi-byte string - common JS String - used for text data - get encoded/decoded to/from utf8

    function polyfill(global) {
      if (!global) {
        global = typeof window == 'undefined' ? typeof global == 'undefined' ? typeof self == 'undefined' ? this || new Function('return this')() : self : global : window;
      }

      if (global) {
        if (typeof atob == 'undefined') {
          global.atob = _atob;
        }

        if (typeof btoa == 'undefined') {
          global.btoa = _btoa;
        }
      }
    }
    function bindProto(__) {
      var __ex = typeof Object.defineProperty == 'function' ? function (name, func
      /*, proto*/
      ) {
        Object.defineProperty(
        /*proto||*/
        __, name, {
          value: func,
          configurable: true,
          enumerable: false,
          writeable: true
        });
      } : function (name, func
      /*, proto*/
      ) {
        // Take care with (for ... in) on strings!

        /*proto||*/
        __[name] = func;
      };

      __ex('base64ByteEncode', function () {
        return _btoa(this);
      });

      __ex('base64ByteDecode', function () {
        return byteDecode(this);
      });

      __ex('base64Encode', function () {
        return mbEncode(this);
      });

      __ex('base64Decode', function () {
        return mbDecode(this);
      });

      __ex('base64ByteUrlEncode', function () {
        return byteUrlEncode(this);
      });

      __ex('base64ByteUrlDecode', function () {
        return byteUrlDecode(this);
      });

      __ex('base64UrlEncode', function () {
        return mbUrlEncode(this);
      });

      __ex('base64UrlDecode', function () {
        return mbUrlDecode(this);
      });
    } // Add String.prototype methods:
    // bindProto(String.prototype);

    exports.VERSION = VERSION;
    exports._atob = _atob;
    exports._btoa = _btoa;
    exports.bindProto = bindProto;
    exports.byteDecode = byteDecode;
    exports.byteEncode = _btoa;
    exports.byteUrlDecode = byteUrlDecode;
    exports.byteUrlEncode = byteUrlEncode;
    exports.decode = mbDecode;
    exports.encode = mbEncode;
    exports.mb2utf8 = utf8Encode;
    exports.mbDecode = mbDecode;
    exports.mbEncode = mbEncode;
    exports.mbUrlDecode = mbUrlDecode;
    exports.mbUrlEncode = mbUrlEncode;
    exports.polyfill = polyfill;
    exports.urlDecode = mbUrlDecode;
    exports.urlEncode = mbUrlEncode;
    exports.utf82mb = utf8Decode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=base64.js.map
