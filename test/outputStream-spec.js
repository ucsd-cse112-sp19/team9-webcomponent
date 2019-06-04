const assert = require('chai').assert

const outputStream = require('../web-component/outputStream');

describe('output-stream element', () => {
    let cs;

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('output-stream');
    });

    it('creates element from document.createElement', () => {
        assert.equal('OUTPUT-STREAM', cs.nodeName); 
    });

    it('should find textarea element in shadowDom', () => {
        cs.connectedCallback();
        const output = cs.shadowRoot.querySelector('textarea');
        
        assert.equal(output.getAttribute('id'), 'msg');
        assert.equal(output.getAttribute('readonly'), '');       
        assert.equal(output.getAttribute('rows'), 'null');
        assert.equal(output.getAttribute('cols'), 'null');  
    });

    it('should find the bootstrap',() => {
        cs.setAttribute('boostrap','border border-secondary');
        assert.equal(cs.getAttribute('boostrap'),'border border-secondary') ;
    });

    it('should delete the bootstrap',() => {
        cs.bootstrap='';
        assert.equal(cs.getAttribute('boostrap'), null);     
    });

    it('should set the bootstrap',() => {
        cs.bootstrap='border border-secondary';
        assert.equal(cs.bootstrap,'border border-secondary');     
    });

    it('should set the text area if we have bootstrap',() => {
        cs.bootstrap='border border-secondary';
        cs.connectedCallback();
        const output = cs.shadowRoot.querySelector('textarea');
        assert.equal(output.getAttribute('class'),cs.bootstrap)
    });

    it('should set the link by default if no bootstrap',() => {
        cs.connectedCallback();
        const link = cs.shadowRoot.querySelector('link');
        assert.equal(link.getAttribute('href'),'outputstream-default-style.css');
    });

    it('should set the link with bootstrap',() => {
        cs.bootstrap='border border-secondary';
        cs.connectedCallback();
        const link = cs.shadowRoot.querySelector('link');
        assert.equal(link.getAttribute('href'),'./bootstrap.min.css');
    });

    it('adds a message in the stream',() => {
        cs.connectedCallback();
        cs.append("testing message")
        const textarea = cs.shadowRoot.querySelector('textarea');
        assert.equal(textarea.innerHTML,"testing message\n")
    });
});