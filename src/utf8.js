
/*globals unescape, escape, decodeURIComponent, encodeURI*/

/// Encode multi-byte into UTF-8 string
export function utf8Encode(str) { return unescape( encodeURI( str ) ); }

/// Decode UTF-8 string to multi-byte string
export function utf8Decode(str) { return decodeURIComponent( escape( str ) ); }
