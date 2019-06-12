const assert = require('chai').assert

const doc = require('document-register-element');

require('../web-component/mqttClient.js');

describe('mqtt-client element', () => {
    let cs;

    before(() => {
    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('mqtt-client');
    });

    afterEach(() => {
    
    });

    it('creates element from document.createElement', () => {
        assert.equal('MQTT-CLIENT', cs.nodeName); 
    });

    describe('Instance variables should exist', () =>{
        it('4 slots should exist', () => {
            cs.connectedCallback();
            const slots = cs.shadowRoot.querySelectorAll("slot");
            let count = 0;
            for(let i = 0; i < slots.length; i++){
                count+=1;
            }
            
            assert.equal(count, 4);
        });
        
        it('Binds should be bond properly', () => {
            const isBound = func => !func.hasOwnProperty('prototype');
            cs.connectedCallback();
            
            assert.equal(isBound(cs.send), true);
            assert.equal(isBound(cs.append),true);
            assert.equal(isBound(cs._onEnter),true);
        }); 

        it('Should not do anything if shadow root is set', () => {
            cs.attachShadow({mode:'open'});
            // if not caught will trigger error because you can't 
            // attach two shadow roots. TODO: brainstorm a better
            // way to do this because kind of hacky
            cs.connectedCallback();
            assert.isNotNull(cs.shadowRoot);
        }); 
    });
});