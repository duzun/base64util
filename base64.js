/**
 *  Base64 string encoding and decoding utility.
 *
 *  play @ https://duzun.me/playground/encode#base64Encode=Test%20String%20
 *
 *  original of _btoa and _atob by: Tyler Akins (http://rumkin.com)
 *
 *
 *  @license MIT
 *  @version 1.0.2
 *  @umd AMD, Browser, CommonJs
 *  @author Dumitru Uzun (DUzun.Me)
 */

(function(name, root, String) {
    'use strict';

    (typeof define !== 'function' || !define.amd
        ? typeof module == 'undefined' || !module.exports
            ? function (deps, factory) { root[name]     = factory(); } // Browser
            : function (deps, factory) { module.exports = factory(); } // CommonJs
        : define // AMD
    )
    /*define*/(/*name, */[], function factory() {

        var base64 = {
            VERSION: '1.0.2'
        }
        ,   b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        ,   wsReg = /[\t\n\r\x20\x0C]+/g
        ,   b64i
        ,   chr = String.fromCharCode
        ,   utf8Encode = function(str) { return unescape( encodeURI( str ) ); }
        ,   utf8Decode = function(str) { return decodeURIComponent( escape( str ) ); }

        // Encodes UTF8 or byte string
        ,   _btoa = function _btoa(data) {
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

        // Decodes UTF8 or byte string
        ,   _atob = function _atob(data) {
                if (!data) return data;
                data = String(data).replace(wsReg, '');

                var o1, o2, o3, h1, h2, h3, h4, c, bits
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

        // Decodes either btoa()'s return or byteUrlEncode()'s return
        ,   base64_bin_decode = function base64_bin_decode(data) {
                var ret = data;
                if(ret) {
                    ret = _atob(String(ret).replace(/_/g, '/').replace(/-/g, '+'));
                }
                return ret;
            }

        ,   base64_bin_encode = _btoa

        // Encodes multi-byte string (common in JS)
        ,   mbEncode = function base64_mb_encode(data) {
                if(!data) return data;
                return _btoa(utf8Encode(data));
            }

        // Decodes to multi-byte string if utf8-encoded
        ,   mbDecode = function base64_mb_decode(data, force_utf8) {
                var ret = base64_bin_decode(data);
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

        ,   byteUrlEncode = function base64_url_encode(data) {
                var ret = _btoa(data);
                return ret && ret.replace(/\=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
            }

        ,   byteUrlDecode = function base64_url_decode(data, force_utf8) {
                var ret = data;
                if(ret) {
                    ret += '==='.substr(0, 3-(ret.length+3)%4);
                    ret = base64_bin_decode(ret, force_utf8);
                }
                return ret;
            }

        ,   mbUrlEncode = function base64_mb_url_encode(data) {
                if(!data) return data;
                var ret = utf8Encode(data);
                return byteUrlEncode(ret);
            }

        ,   mbUrlDecode = function base64_mb_url_decode(data) {
                var ret = byteUrlDecode(data);
                return ret && utf8Decode(ret);
            }

        ;

        // if ( typeof chr.bind == 'function' ) chr = chr.bind(String);

        // Internal functions
        base64._btoa = _btoa;
        base64._atob = _atob;

        // Node.js
        if(typeof Buffer == 'function') {
            _atob = function (data) { return new Buffer(data, 'base64').toString('utf8'); }
            _btoa = function (data) { return new Buffer(data, 'utf8').toString('base64'); }
        }
        // Modern browsers
        if(typeof atob == 'function') {
            _atob = atob;
        }
        if(typeof btoa == 'function') {
            _btoa = btoa;
            base64_bin_encode = function (data) { return _btoa(data); };
        }

        // Export:

        // encode/decode byte-string - 8bit per char - used for binary data
        base64.byteEncode    = base64_bin_encode;
        base64.byteDecode    = base64_bin_decode;

        // Encode for URL
        base64.byteUrlEncode = byteUrlEncode;
        base64.byteUrlDecode = byteUrlDecode;

        // multi-byte string - common JS String - used for text data - get encoded/decoded to/from utf8
        base64.encode        = mbEncode;
        base64.decode        = mbDecode;

        base64.urlEncode     = mbUrlEncode;
        base64.urlDecode     = mbUrlDecode;

        base64.mb2utf8 = utf8Encode; // encode multi-byte into UTF-8 string
        base64.utf82mb = utf8Decode; // decode UTF-8 string to multi-byte string


        // Add String.prototype methods:
        var __ = String.prototype
        ,   __ex = typeof Object.defineProperty == 'function'
              ? function (name, func/*, proto*/) {
                  Object.defineProperty(/*proto||*/__, name, {
                      value: func,
                      configurable: true,
                      enumerable: false,
                      writeable: true
                  })
              }
              : function (name, func/*, proto*/) {
                  // Take care with (for ... in) on strings!
                  (/*proto||*/__)[name] = func;
              }
        ;

       __ex('base64ByteEncode', function () { return _btoa(this); });
       __ex('base64ByteDecode', function () { return base64_bin_decode(this); });

       __ex('base64Encode', function () { return mbEncode(this); });
       __ex('base64Decode', function () { return mbDecode(this); });

       __ex('base64ByteUrlEncode', function () { return byteUrlEncode(this); });
       __ex('base64ByteUrlDecode', function () { return byteUrlDecode(this); });

       __ex('base64UrlEncode', function () { return mbUrlEncode(this); });
       __ex('base64UrlDecode', function () { return mbUrlDecode(this); });


        return base64;
    });
}
('base64', this, String));
