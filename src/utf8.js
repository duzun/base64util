
/*globals unescape, escape*/

/// Encode multi-byte into UTF-8 string
export const utf8Encode = (str) => unescape( encodeURI( str ) );

/// Decode UTF-8 string to multi-byte string
export const utf8Decode = (str) => decodeURIComponent( escape( str ) );
