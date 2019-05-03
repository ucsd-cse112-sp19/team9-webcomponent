const assert = require('chai').assert
// const expect = require('../web_component/CoreHello'); 
var jsdom = require('jsdom');

tempDom = new jsdom.JSDOM().window; 
// global.window = new jsdom.JSDOM().window;
// global.document = window.document;
// global.HTMLElement = window.HTMLElement;


describe('core-hello element', () => {
    describe('element creation', () => {
        it('creates from document.createElement', () => {
            const el = tempDom.document.createElement('core-hello'); 
            assert.equal('CORE-HELLO', el.nodeName); 
        })
    })
}); 
