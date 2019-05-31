const assert = require('chai').assert

const doc = require('document-register-element');

const inputBox = require('../web-component/inputBox');

describe('input-box element', () => {
    let cs;

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('input-box');        
        cs.connectedCallback();
    });

    it('creates element from document.createElement', () => {
        assert.equal('INPUT-BOX', cs.nodeName); 
    });

    it('should find input element in shadowDom', () => {
        const input = cs.shadowRoot.querySelector('input');
        
        assert.equal(input.getAttribute('id'), 'msg');
        assert.equal(input.getAttribute('name'), 'msg');
        assert.equal(input.getAttribute('value'), '');
    });
});