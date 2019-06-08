const assert = require('chai').assert

class TestConstructor extends HTMLElement{
    constructor(){
        super();
        this.shadowRoot=attachShadow({mode: 'open'});
    }
    connectedCallback(){

    }
}
customElements.define('test-constructor', TestConstructor);
class TestConnected extends HTMLElement{
    constructor(){
        super(); 
    }
    connectedCallback(){
        this.attachShadow({mode: 'open'});
    }
}
customElements.define('test-connected', TestConnected);



describe('ASFASFS element', () => {
    let cs;

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {

    });

    it('call constructed', () => {
        cs = document.createElement('test-constructor');
        console.log(cs.shadowRoot)
        assert.isNotNull(cs.shadowRoot); 
    });

    it('call connected', () => {
        cs = document.createElement('test-connected');
        cs.connectedCallback();
        assert.isNotNull(cs.shadowRoot); 
    });


    });