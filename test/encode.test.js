const g = typeof global == 'undefined' ? window : global;
const _Buffer = g.Buffer;
const _btoa = g.btoa;
delete g.Buffer;
delete g.btoa;

// const esm = require('esm')(module);
// const { byteEncode, encode, byteUrlEncode } = esm('../src/base64');
const { byteEncode, encode, byteUrlEncode } = require('../dist/base64');

if (_Buffer) g.Buffer = _Buffer;
if (_btoa) g.btoa = _btoa;

require('chai').should();

// For encoding test I had used information presented in Base64 Wikipedia Page (English Version).
// For more information: http://en.wikipedia.org/wiki/Base64
describe('# Encoding Tests', function () {
    describe('> .encode(str)', function () {

        it('should encode long unicode texts', function () {
            //Based in http://www.motobit.com/util/base64-decoder-encoder.asp
            var WikipediaText1 = 'Não se pode pensar em heresia porque não fazia sentido, em tempos de Contra-Reforma, acreditar nos deuses do panteão greco-romano, e a prova é a não censura dos inquisidores aos «Deoses dos Gentios». No episódio da Máquina do Mundo (estrofe 82 do Canto X), é o próprio personagem da deusa Tétis que afirma: «eu, Saturno e Jano, Júpiter, Juno, fomos fabulosos, Fingidos de mortal e cego engano. Só pera fazer versos deleitosos Servimos». No entanto, críticos defendem que esta fala de Tétis foi introduzida a pedido dos Censores, e que várias outras Oitavas foram ou alteradas, ou mesmo cortadas, para que o Poema pudesse ser publicado.';
            var WikipediaText1based64 = 'TsOjbyBzZSBwb2RlIHBlbnNhciBlbSBoZXJlc2lhIHBvcnF1ZSBuw6NvIGZhemlhIHNlbnRpZG8sIGVtIHRlbXBvcyBkZSBDb250cmEtUmVmb3JtYSwgYWNyZWRpdGFyIG5vcyBkZXVzZXMgZG8gcGFudGXDo28gZ3JlY28tcm9tYW5vLCBlIGEgcHJvdmEgw6kgYSBuw6NvIGNlbnN1cmEgZG9zIGlucXVpc2lkb3JlcyBhb3MgwqtEZW9zZXMgZG9zIEdlbnRpb3PCuy4gTm8gZXBpc8OzZGlvIGRhIE3DoXF1aW5hIGRvIE11bmRvIChlc3Ryb2ZlIDgyIGRvIENhbnRvIFgpLCDDqSBvIHByw7NwcmlvIHBlcnNvbmFnZW0gZGEgZGV1c2EgVMOpdGlzIHF1ZSBhZmlybWE6IMKrZXUsIFNhdHVybm8gZSBKYW5vLCBKw7pwaXRlciwgSnVubywgZm9tb3MgZmFidWxvc29zLCBGaW5naWRvcyBkZSBtb3J0YWwgZSBjZWdvIGVuZ2Fuby4gU8OzIHBlcmEgZmF6ZXIgdmVyc29zIGRlbGVpdG9zb3MgU2Vydmltb3PCuy4gTm8gZW50YW50bywgY3LDrXRpY29zIGRlZmVuZGVtIHF1ZSBlc3RhIGZhbGEgZGUgVMOpdGlzIGZvaSBpbnRyb2R1emlkYSBhIHBlZGlkbyBkb3MgQ2Vuc29yZXMsIGUgcXVlIHbDoXJpYXMgb3V0cmFzIE9pdGF2YXMgZm9yYW0gb3UgYWx0ZXJhZGFzLCBvdSBtZXNtbyBjb3J0YWRhcywgcGFyYSBxdWUgbyBQb2VtYSBwdWRlc3NlIHNlciBwdWJsaWNhZG8u';
            encode(WikipediaText1).should.equal(WikipediaText1based64);

            var WikipediaText2 = "Fanny Bullock Workman was an American geographer, cartographer, explorer, travel writer, and mountaineer, notably in the Himalaya. She was one of the first female professional mountaineers; she not only explored but also wrote about her adventures. She set several women's altitude records, published eight travel books with her husband, and championed women's rights and women's suffrage. Educated in the finest schools available to women, she was introduced to climbing in New Hampshire. She married William Hunter Workman, and traveled the world with him. The couple had two children, but left them in schools and with nurses. Workman saw herself as a New Woman who could equal any man. The Workmans wrote books about each trip and Workman frequently commented on the state of the lives of women that she saw. They explored several glaciers and conquered several mountains of the Himalaya, eventually reaching 23,000 feet (7,000 m), a women's altitude record at the time. Workman became the first woman to lecture at the Sorbonne and the second to speak at the Royal Geographical Society. She received many medals of honor and was recognized as one of the foremost climbers of her day.";
            var WikipediaText2based64 = 'RmFubnkgQnVsbG9jayBXb3JrbWFuIHdhcyBhbiBBbWVyaWNhbiBnZW9ncmFwaGVyLCBjYXJ0b2dyYXBoZXIsIGV4cGxvcmVyLCB0cmF2ZWwgd3JpdGVyLCBhbmQgbW91bnRhaW5lZXIsIG5vdGFibHkgaW4gdGhlIEhpbWFsYXlhLiBTaGUgd2FzIG9uZSBvZiB0aGUgZmlyc3QgZmVtYWxlIHByb2Zlc3Npb25hbCBtb3VudGFpbmVlcnM7IHNoZSBub3Qgb25seSBleHBsb3JlZCBidXQgYWxzbyB3cm90ZSBhYm91dCBoZXIgYWR2ZW50dXJlcy4gU2hlIHNldCBzZXZlcmFsIHdvbWVuJ3MgYWx0aXR1ZGUgcmVjb3JkcywgcHVibGlzaGVkIGVpZ2h0IHRyYXZlbCBib29rcyB3aXRoIGhlciBodXNiYW5kLCBhbmQgY2hhbXBpb25lZCB3b21lbidzIHJpZ2h0cyBhbmQgd29tZW4ncyBzdWZmcmFnZS4gRWR1Y2F0ZWQgaW4gdGhlIGZpbmVzdCBzY2hvb2xzIGF2YWlsYWJsZSB0byB3b21lbiwgc2hlIHdhcyBpbnRyb2R1Y2VkIHRvIGNsaW1iaW5nIGluIE5ldyBIYW1wc2hpcmUuIFNoZSBtYXJyaWVkIFdpbGxpYW0gSHVudGVyIFdvcmttYW4sIGFuZCB0cmF2ZWxlZCB0aGUgd29ybGQgd2l0aCBoaW0uIFRoZSBjb3VwbGUgaGFkIHR3byBjaGlsZHJlbiwgYnV0IGxlZnQgdGhlbSBpbiBzY2hvb2xzIGFuZCB3aXRoIG51cnNlcy4gV29ya21hbiBzYXcgaGVyc2VsZiBhcyBhIE5ldyBXb21hbiB3aG8gY291bGQgZXF1YWwgYW55IG1hbi4gVGhlIFdvcmttYW5zIHdyb3RlIGJvb2tzIGFib3V0IGVhY2ggdHJpcCBhbmQgV29ya21hbiBmcmVxdWVudGx5IGNvbW1lbnRlZCBvbiB0aGUgc3RhdGUgb2YgdGhlIGxpdmVzIG9mIHdvbWVuIHRoYXQgc2hlIHNhdy4gVGhleSBleHBsb3JlZCBzZXZlcmFsIGdsYWNpZXJzIGFuZCBjb25xdWVyZWQgc2V2ZXJhbCBtb3VudGFpbnMgb2YgdGhlIEhpbWFsYXlhLCBldmVudHVhbGx5IHJlYWNoaW5nIDIzLDAwMCBmZWV0ICg3LDAwMCBtKSwgYSB3b21lbidzIGFsdGl0dWRlIHJlY29yZCBhdCB0aGUgdGltZS4gV29ya21hbiBiZWNhbWUgdGhlIGZpcnN0IHdvbWFuIHRvIGxlY3R1cmUgYXQgdGhlIFNvcmJvbm5lIGFuZCB0aGUgc2Vjb25kIHRvIHNwZWFrIGF0IHRoZSBSb3lhbCBHZW9ncmFwaGljYWwgU29jaWV0eS4gU2hlIHJlY2VpdmVkIG1hbnkgbWVkYWxzIG9mIGhvbm9yIGFuZCB3YXMgcmVjb2duaXplZCBhcyBvbmUgb2YgdGhlIGZvcmVtb3N0IGNsaW1iZXJzIG9mIGhlciBkYXku';
            encode(WikipediaText2).should.equal(WikipediaText2based64);

            encode('Isto é apenas um grande TESTE').should.equal('SXN0byDDqSBhcGVuYXMgdW0gZ3JhbmRlIFRFU1RF');
        });

        it('should encode Russian texts', function () {
            encode('Опять 25!').should.equal('0J7Qv9GP0YLRjCAyNSE=');
            encode('Аa Бb Вv Гɡ Дd Еje Ёjo Жʐ Зz Иi ЙjКk Лl Мm Нn Оo Пp Рr Сs Тt Уu ФfХx Цts Чtɕ Шʂ Щɕː Ъ- Ыɨ Ьʲ Эe Юju Яja')
            .should.equal('0JBhINCRYiDQknYg0JPJoSDQlGQg0JVqZSDQgWpvINCWypAg0Jd6INCYaSDQmWrQmmsg0JtsINCcbSDQnW4g0J5vINCfcCDQoHIg0KFzINCidCDQo3Ug0KRm0KV4INCmdHMg0Kd0yZUg0KjKgiDQqcmVy5Ag0KotINCryagg0KzKsiDQrWUg0K5qdSDQr2ph');
        });

        it('should encode binary strings, but not as byte-strings', function () {
            let a = new Array(256);
            for(let i=256; i--;) a[i] = String.fromCharCode(i);
            a = a.join('');
            let e = encode(a);
            let be = byteEncode(a);
            e.length.should.be.gt(be.length);
            e.should.not.equal(be);
        });
    });

    describe('> .byteEncode(str)', function () {
        it('should be same as .encode(str) on byte-strings', function () {
            let str = 'something interesting happening... 1 2 3';
            byteEncode(str).should.equal(encode(str));
        });

        it('should encode a Wikipedia Leviathan quote example', function () {
            //Wikipedia first example: A quote from Thomas Hobbes' Leviathan:
            var leviathanQuote = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
            var leviathanQuote64Based = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=';
            byteEncode(leviathanQuote).should.equal(leviathanQuote64Based);
        });

        it('should add padding final indicators == and =', function () {
            //Wikipedia Padding examples
            byteEncode('any carnal pleasure.').should.equal('YW55IGNhcm5hbCBwbGVhc3VyZS4=');
            byteEncode('any carnal pleasure').should.equal('YW55IGNhcm5hbCBwbGVhc3VyZQ==');
            byteEncode('any carnal pleasur').should.equal('YW55IGNhcm5hbCBwbGVhc3Vy');
            byteEncode('any carnal pleasu').should.equal('YW55IGNhcm5hbCBwbGVhc3U=');
            byteEncode('any carnal pleas').should.equal('YW55IGNhcm5hbCBwbGVhcw==');

            byteEncode('pleasure.').should.equal('cGxlYXN1cmUu');
            byteEncode('leasure.').should.equal('bGVhc3VyZS4=');
            byteEncode('easure.').should.equal('ZWFzdXJlLg==');
            byteEncode('asure.').should.equal('YXN1cmUu');
            byteEncode('sure.').should.equal('c3VyZS4=');
        });

        it('should encode some random tests found on internet', function () {
            //http://examples.javacodegeeks.com/core-java/apache/commons/codec/encode-base64/
            byteEncode('Javacodegeeks').should.equal('SmF2YWNvZGVnZWVrcw==');
            //http://pymotw.com/2/base64/
            byteEncode('This is the data, in the clear.').should.equal('VGhpcyBpcyB0aGUgZGF0YSwgaW4gdGhlIGNsZWFyLg==');
            //http://stackoverflow.com/questions/7360403/base-64-encode-and-decode-example-code
            byteEncode('techPass').should.equal('dGVjaFBhc3M=');
        });

        it('should encode long unicode texts as byte-strings', function () {
            //Based in http://www.motobit.com/util/base64-decoder-encoder.asp
            var WikipediaText1 = 'Não se pode pensar em heresia porque não fazia sentido, em tempos de Contra-Reforma, acreditar nos deuses do panteão greco-romano, e a prova é a não censura dos inquisidores aos «Deoses dos Gentios». No episódio da Máquina do Mundo (estrofe 82 do Canto X), é o próprio personagem da deusa Tétis que afirma: «eu, Saturno e Jano, Júpiter, Juno, fomos fabulosos, Fingidos de mortal e cego engano. Só pera fazer versos deleitosos Servimos». No entanto, críticos defendem que esta fala de Tétis foi introduzida a pedido dos Censores, e que várias outras Oitavas foram ou alteradas, ou mesmo cortadas, para que o Poema pudesse ser publicado.';
            var bWikipediaText1based64 = 'TuNvIHNlIHBvZGUgcGVuc2FyIGVtIGhlcmVzaWEgcG9ycXVlIG7jbyBmYXppYSBzZW50aWRvLCBlbSB0ZW1wb3MgZGUgQ29udHJhLVJlZm9ybWEsIGFjcmVkaXRhciBub3MgZGV1c2VzIGRvIHBhbnRl428gZ3JlY28tcm9tYW5vLCBlIGEgcHJvdmEg6SBhIG7jbyBjZW5zdXJhIGRvcyBpbnF1aXNpZG9yZXMgYW9zIKtEZW9zZXMgZG9zIEdlbnRpb3O7LiBObyBlcGlz82RpbyBkYSBN4XF1aW5hIGRvIE11bmRvIChlc3Ryb2ZlIDgyIGRvIENhbnRvIFgpLCDpIG8gcHLzcHJpbyBwZXJzb25hZ2VtIGRhIGRldXNhIFTpdGlzIHF1ZSBhZmlybWE6IKtldSwgU2F0dXJubyBlIEphbm8sIEr6cGl0ZXIsIEp1bm8sIGZvbW9zIGZhYnVsb3NvcywgRmluZ2lkb3MgZGUgbW9ydGFsIGUgY2VnbyBlbmdhbm8uIFPzIHBlcmEgZmF6ZXIgdmVyc29zIGRlbGVpdG9zb3MgU2Vydmltb3O7LiBObyBlbnRhbnRvLCBjcu10aWNvcyBkZWZlbmRlbSBxdWUgZXN0YSBmYWxhIGRlIFTpdGlzIGZvaSBpbnRyb2R1emlkYSBhIHBlZGlkbyBkb3MgQ2Vuc29yZXMsIGUgcXVlIHbhcmlhcyBvdXRyYXMgT2l0YXZhcyBmb3JhbSBvdSBhbHRlcmFkYXMsIG91IG1lc21vIGNvcnRhZGFzLCBwYXJhIHF1ZSBvIFBvZW1hIHB1ZGVzc2Ugc2VyIHB1YmxpY2Fkby4=';
            byteEncode(WikipediaText1).should.equal(bWikipediaText1based64);

            var WikipediaText2 = "Fanny Bullock Workman was an American geographer, cartographer, explorer, travel writer, and mountaineer, notably in the Himalaya. She was one of the first female professional mountaineers; she not only explored but also wrote about her adventures. She set several women's altitude records, published eight travel books with her husband, and championed women's rights and women's suffrage. Educated in the finest schools available to women, she was introduced to climbing in New Hampshire. She married William Hunter Workman, and traveled the world with him. The couple had two children, but left them in schools and with nurses. Workman saw herself as a New Woman who could equal any man. The Workmans wrote books about each trip and Workman frequently commented on the state of the lives of women that she saw. They explored several glaciers and conquered several mountains of the Himalaya, eventually reaching 23,000 feet (7,000 m), a women's altitude record at the time. Workman became the first woman to lecture at the Sorbonne and the second to speak at the Royal Geographical Society. She received many medals of honor and was recognized as one of the foremost climbers of her day.";
            var WikipediaText2based64 = 'RmFubnkgQnVsbG9jayBXb3JrbWFuIHdhcyBhbiBBbWVyaWNhbiBnZW9ncmFwaGVyLCBjYXJ0b2dyYXBoZXIsIGV4cGxvcmVyLCB0cmF2ZWwgd3JpdGVyLCBhbmQgbW91bnRhaW5lZXIsIG5vdGFibHkgaW4gdGhlIEhpbWFsYXlhLiBTaGUgd2FzIG9uZSBvZiB0aGUgZmlyc3QgZmVtYWxlIHByb2Zlc3Npb25hbCBtb3VudGFpbmVlcnM7IHNoZSBub3Qgb25seSBleHBsb3JlZCBidXQgYWxzbyB3cm90ZSBhYm91dCBoZXIgYWR2ZW50dXJlcy4gU2hlIHNldCBzZXZlcmFsIHdvbWVuJ3MgYWx0aXR1ZGUgcmVjb3JkcywgcHVibGlzaGVkIGVpZ2h0IHRyYXZlbCBib29rcyB3aXRoIGhlciBodXNiYW5kLCBhbmQgY2hhbXBpb25lZCB3b21lbidzIHJpZ2h0cyBhbmQgd29tZW4ncyBzdWZmcmFnZS4gRWR1Y2F0ZWQgaW4gdGhlIGZpbmVzdCBzY2hvb2xzIGF2YWlsYWJsZSB0byB3b21lbiwgc2hlIHdhcyBpbnRyb2R1Y2VkIHRvIGNsaW1iaW5nIGluIE5ldyBIYW1wc2hpcmUuIFNoZSBtYXJyaWVkIFdpbGxpYW0gSHVudGVyIFdvcmttYW4sIGFuZCB0cmF2ZWxlZCB0aGUgd29ybGQgd2l0aCBoaW0uIFRoZSBjb3VwbGUgaGFkIHR3byBjaGlsZHJlbiwgYnV0IGxlZnQgdGhlbSBpbiBzY2hvb2xzIGFuZCB3aXRoIG51cnNlcy4gV29ya21hbiBzYXcgaGVyc2VsZiBhcyBhIE5ldyBXb21hbiB3aG8gY291bGQgZXF1YWwgYW55IG1hbi4gVGhlIFdvcmttYW5zIHdyb3RlIGJvb2tzIGFib3V0IGVhY2ggdHJpcCBhbmQgV29ya21hbiBmcmVxdWVudGx5IGNvbW1lbnRlZCBvbiB0aGUgc3RhdGUgb2YgdGhlIGxpdmVzIG9mIHdvbWVuIHRoYXQgc2hlIHNhdy4gVGhleSBleHBsb3JlZCBzZXZlcmFsIGdsYWNpZXJzIGFuZCBjb25xdWVyZWQgc2V2ZXJhbCBtb3VudGFpbnMgb2YgdGhlIEhpbWFsYXlhLCBldmVudHVhbGx5IHJlYWNoaW5nIDIzLDAwMCBmZWV0ICg3LDAwMCBtKSwgYSB3b21lbidzIGFsdGl0dWRlIHJlY29yZCBhdCB0aGUgdGltZS4gV29ya21hbiBiZWNhbWUgdGhlIGZpcnN0IHdvbWFuIHRvIGxlY3R1cmUgYXQgdGhlIFNvcmJvbm5lIGFuZCB0aGUgc2Vjb25kIHRvIHNwZWFrIGF0IHRoZSBSb3lhbCBHZW9ncmFwaGljYWwgU29jaWV0eS4gU2hlIHJlY2VpdmVkIG1hbnkgbWVkYWxzIG9mIGhvbm9yIGFuZCB3YXMgcmVjb2duaXplZCBhcyBvbmUgb2YgdGhlIGZvcmVtb3N0IGNsaW1iZXJzIG9mIGhlciBkYXku';
            byteEncode(WikipediaText2).should.equal(WikipediaText2based64);

            byteEncode('Isto é apenas um grande TESTE').should.equal('SXN0byDpIGFwZW5hcyB1bSBncmFuZGUgVEVTVEU=');
        });

        it('should encode binary strings', function () {
            let a = new Array(256);
            for(let i=256; i--;) a[i] = String.fromCharCode(i);
            a = a.join('');
            byteEncode(a).should.equal('AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==');
        });

    });

    describe('> .byteUrlEncode(str)', function () {
        it('should not add final padding "="', function () {
            //Wikipedia Padding examples
            byteUrlEncode('any carnal pleasure.').should.equal('YW55IGNhcm5hbCBwbGVhc3VyZS4');
            byteUrlEncode('any carnal pleasure').should.equal('YW55IGNhcm5hbCBwbGVhc3VyZQ');
            byteUrlEncode('any carnal pleasur').should.equal('YW55IGNhcm5hbCBwbGVhc3Vy');
            byteUrlEncode('any carnal pleasu').should.equal('YW55IGNhcm5hbCBwbGVhc3U');
            byteUrlEncode('any carnal pleas').should.equal('YW55IGNhcm5hbCBwbGVhcw');

            byteUrlEncode('pleasure.').should.equal('cGxlYXN1cmUu');
            byteUrlEncode('leasure.').should.equal('bGVhc3VyZS4');
            byteUrlEncode('easure.').should.equal('ZWFzdXJlLg');
            byteUrlEncode('asure.').should.equal('YXN1cmUu');
            byteUrlEncode('sure.').should.equal('c3VyZS4');
        });

        it('should encode binary strings', function () {
            let a = new Array(256);
            for(let i=256; i--;) a[i] = String.fromCharCode(i);
            byteUrlEncode(a.join('')).should.equal('AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0-P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn-AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq-wsbKztLW2t7i5uru8vb6_wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t_g4eLj5OXm5-jp6uvs7e7v8PHy8_T19vf4-fr7_P3-_w');
        });
    });

});
