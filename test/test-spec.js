const assert = require('chai').assert

class TestConstructor extends HTMLElement{
    constructor(){
        super();
        super.attachShadow({mode: 'open'});
        console.log(this.shadowRoot)
        customElements.whenDefined( 'test-constructor').then( () => {
            let el = document.getElementById('elementId');
            console.log(el.shadowRoot);
        
        })
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