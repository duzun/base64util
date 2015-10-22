# base64util [![Build Status](https://travis-ci.org/duzun/base64util.svg?branch=master)](https://travis-ci.org/duzun/base64util)
base64 encode/decode utility for browsers and node.js,
with polyfill and URL friendly format.

Works with multi-byte and utf8 strings.

## Usage

### Include `base64` the way you like (AMD/CommonJs/script)

```javascript
// multi-byte string - common JS String - used for text data - gets encoded to utf8
base64.encode('plain') ;

// multi-byte string - common JS String - used for text data - gets decoded from utf8
base64.decode('base64');

// same as encode/decode, but instead of "/+" uses "_-" - URL friendly
base64.urlEncode('plain') ;
base64.urlDecode('base64');

// encode/decode byte-string - 8bit per char - used for binary data
base64.byteEncode('plain') ;
base64.byteDecode('base64');

// Encode byte-string for URL
base64.byteUrlEncode('plain') ;
base64.byteUrlDecode('base64');
```

### String.prototype methods

```javascript
'plain'.base64ByteEncode() ;
'base64'.base64ByteDecode();

'plain'.base64Encode() ;
'base64'.base64Decode();

'plain'.base64ByteUrlEncode() ;
'base64'.base64ByteUrlDecode();

'plain'.base64UrlEncode() ;
'base64'.base64UrlDecode();

```

