# base64util [![Build Status](https://travis-ci.com/duzun/base64util.svg?branch=master)](https://travis-ci.com/duzun/base64util) [![codecov](https://codecov.io/gh/duzun/base64util/branch/master/graph/badge.svg)](https://codecov.io/gh/duzun/base64util)
base64 encode/decode utility for browsers and node.js,
with polyfill and URL friendly format.

Works with multi-byte and utf8 [strings](https://github.com/duzun/string-encode.js#the-theory-of-string-).

## Usage

### Include [`base64`](https://unpkg.com/base64util) the way you like (AMD/CommonJs/script)

```js
// Encodes multi-byte string as utf8 to base64 (common String)
base64.encode('plain') ;

// Decodes to multi-byte string if utf8-encoded as base64
base64.decode('base64');

// same as encode/decode, but instead of "/" and "+" uses "_" and "-" (URL friendly)
base64.urlEncode('plain') ;
base64.urlDecode('base64');

// encode/decode byte-string - 8bit per char - used for binary data
base64.byteEncode('plain') ;
base64.byteDecode('base64');

// Encode byte-string for URL
base64.byteUrlEncode('plain') ;
base64.byteUrlDecode('base64');
```


### Polyfill

```js
if ( typeof atob === 'undefined' ) {
    var window.atob = base64._atob;
    var window.btoa = base64._btoa;
}
```

or

```js
base64.polyfill(window);
```


### String.prototype methods

```js

// Add String.prototype methods:
bindProto(String.prototype)

'plain'.base64ByteEncode() ;
'base64'.base64ByteDecode();

'plain'.base64Encode() ;
'base64'.base64Decode();

'plain'.base64ByteUrlEncode() ;
'base64'.base64ByteUrlDecode();

'plain'.base64UrlEncode() ;
'base64'.base64UrlDecode();

```

