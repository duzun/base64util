
// const esm = require('esm')(module);
// const { bindProto } = esm('../src/base64');
const { bindProto } = require('../dist/base64');

require('chai').should();

describe('# bindProto(String.prototype)', function () {
    bindProto(String.prototype);

    it('str.base64Decode(), str.base64Encode()', function () {
        var leviathanQuote = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
        var leviathanQuote64Based = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=';
        leviathanQuote.base64Encode().should.equal(leviathanQuote64Based);
        leviathanQuote64Based.base64Decode().should.equal(leviathanQuote);
    });

    it('str.base64ByteDecode(), str.base64ByteEncode()', function () {
        'any carnal pleasure.'.base64ByteEncode().should.equal('YW55IGNhcm5hbCBwbGVhc3VyZS4=');
        'YW55IGNhcm5hbCBwbGVhc3VyZS4='.base64ByteDecode().should.equal('any carnal pleasure.');

        '  <<>>  '.base64ByteEncode().should.equal('ICA8PD4+ICA=');
        'ICA8PD4+ICA='.base64ByteDecode().should.equal('  <<>>  ');
    });

    it('str.base64ByteUrlEncode(), str.base64ByteUrlDecode()', function () {
        'any carnal pleasure.'.base64ByteUrlEncode().should.equal('YW55IGNhcm5hbCBwbGVhc3VyZS4');
        'YW55IGNhcm5hbCBwbGVhc3VyZS4'.base64ByteUrlDecode().should.equal('any carnal pleasure.');

        '  <<>>  '.base64ByteUrlEncode().should.equal('ICA8PD4-ICA');
        'ICA8PD4-ICA'.base64ByteUrlDecode().should.equal('  <<>>  ');
    });

    it('str.base64UrlEncode(), str.base64UrlDecode()', function () {
        'any carnal pleasure.'.base64UrlEncode().should.equal('YW55IGNhcm5hbCBwbGVhc3VyZS4');
        'YW55IGNhcm5hbCBwbGVhc3VyZS4'.base64UrlDecode().should.equal('any carnal pleasure.');

        'а <<>>  я'.base64UrlEncode().should.equal('0LAgPDw-PiAg0Y8');
        '0LAgPDw-PiAg0Y8'.base64UrlDecode().should.equal('а <<>>  я');
    });
});
