const assert = require('chai').assert

const doc = require('document-register-element');

const inputRT = require('../web-component/inputRT');

describe('input-rt element', () => {
    let cs;

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('input-rt');
    });

    it('creates element from document.createElement', () => {
        assert.equal('INPUT-RT', cs.nodeName); 
    });

    describe('Instance variables should exist', () =>{
        it('3 slots should exist', () => {
            cs.connectedCallback();
            const slots = cs.shadowRoot.querySelectorAll("slot");
            let count = 0;
            for(let i = 0; i < slots.length; i++){
                count+=1;
            }
            
            assert.equal(count, 3);
        });
        
        it('Binds should be bond properly', () => {
            const isBound = func => !func.hasOwnProperty('prototype');
            cs.connectedCallback();
            
            assert.equal(isBound(cs.send), true);
            assert.equal(isBound(cs.append),true);
            assert.equal(isBound(cs._onEnter),true);
        }); 
    });

    describe('Testing mode attribute', () =>{
        it('should find input element in shadowDom when set in default mode', () => {
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
                
            assert.equal(input.getAttribute('slot'), 'text');
        });
        
        it('should find input element in shadowDom when set in sender mode', () => {
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            
            assert.equal(input.getAttribute('slot'), 'text');
        });
    
        it('should find textarea element in shadowDom when set in textarea mode', () => {
            cs.setAttribute('mode','textarea')
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const textarea = slot.querySelector('textarea');
            
            assert.equal(textarea.getAttribute('slot'),'text');
        });

        it('nothing should be set if custom attribute is set', () => {
            cs.setAttribute('mode','custom')
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            
            assert.equal(slot.innerHTML, '');
        });
    });

    // describe('Testing mode attribute event handlers', () => {

    // });

    describe('Testing internal functions', () => {
        let globalTest = "";
        class TestSender extends HTMLElement{
            constructor(){
                super();
            }
            send(message){
                globalTest = message;
            }
        }
        customElements.define('test-sender', TestSender);
        it('should properly use send', () => {
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);

            globalTest = "";
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');
            cs.appendChild(testEl);
            cs.send();

            assert.equal(globalTest, msg);
            assert.equal(input.value, '');
        });

        it('should fire if a button is appended', () => {
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);

            globalTest = "";
            // create a sender
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');

            // create a button
            let testButton = document.createElement('button');
            testButton.setAttribute('slot', 'append');
            
            cs.appendChild(testEl);
            cs.appendChild(testButton);
            
            testButton.click();

            assert.equal(globalTest, msg);
            assert.equal(input.value, '');
        });

        it('should fire if an enter event is triggered', () => {
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);

            globalTest = "";
            // create a sender
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');
            cs.appendChild(testEl);

            // TODO fire an enter

            assert.equal(globalTest, msg);
            assert.equal(input.value, '');
        });

        it('should not fire if a button is appended because unconnected', () => {
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            cs.disconnectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);

            globalTest = "";
            // create a sender
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');

            // create a button
            let testButton = document.createElement('button');
            testButton.setAttribute('slot', 'append');
            
            cs.appendChild(testEl);
            cs.appendChild(testButton);
            
            testButton.click();

            assert.equal(globalTest, '');
            assert.equal(input.value, msg);
        });

        it('should properly call append', () => {
            cs.setAttribute('mode','textarea');
            cs.connectedCallback();

            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const textarea = slot.querySelector('textarea');

            assert.equal(textarea.innerHTML, '');
            const msg = 'test-message';
            cs.append(msg);
            assert.equal(textarea.innerHTML, 'test-message\n');
            assert.equal(textarea.scrollTop, textarea.scrollHeight);
        });

        it('should properly call _onEnter', () => {
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);

            globalTest = "";
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');

            cs.appendChild(testEl);
            class FakeEnterEvent extends Object {
                constructor(){
                    super();
                    this.keyCode = 13;
                }
                
            }
            cs._onEnter(new FakeEnterEvent);

            assert.equal(globalTest, msg);
            assert.equal(input.value, '');
        });

        it('should not fire send on nonEnters', ()=>{
            cs.setAttribute('mode','sender');
            cs.connectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);

            globalTest = "";
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');

            cs.appendChild(testEl);
            class FakeFaultyEvent extends Object {
                constructor(){
                    super();
                    this.keyCode = 14;
                }
                
            }
            cs._onEnter(new FakeFaultyEvent);

            assert.equal(globalTest, '');
            assert.equal(input.value, msg);
            
        });
    });

//     describe('set and delete all the attributes', () => {
//         it('should find the bootstrap',() => {
//             cs.setAttribute('boostrap','border border-secondary');
//             assert.equal(cs.getAttribute('boostrap'),'border border-secondary') ;
//         });

//         it('should delete the bootstrap',() => {
//             cs.bootstrap='';
//             assert.equal(cs.getAttribute('boostrap'), null);     
//         });

//         it('should set the bootstrap',() => {
//             cs.bootstrap='border border-secondary';
//             assert.equal(cs.bootstrap,'border border-secondary');     
//         });

//         it('should set the size',() => {
//             cs.size=1;
//             assert.equal(cs.getAttribute('size'), 1);
//         });  

//         it('should delete the size',() => {
//             cs.size='';
//             assert.equal(cs.getAttribute('size'), null);
//         }); 

//         it('should set the height',() => {
//             cs.height=1;
//             assert.equal(cs.getAttribute('height'), 1);
//         });  

//         it('should delete the height',() => {
//             cs.height='';
//             assert.equal(cs.getAttribute('height'), null);
//         }); 

//         it('should set the width',() => {
//             cs.width=1;
//             assert.equal(cs.getAttribute('width'), 1);
//         });  

//         it('should delete the width',() => {
//             cs.width='';
//             assert.equal(cs.getAttribute('width'), null);
//         }); 

//         it('should set the disabled',() => {
//             cs.disabled=true;
//             assert.equal(cs.getAttribute('disabled'), 'true');
//         });  

//         it('should delete the disabled ',() => {
//         cs.disabled=false;
//         assert.equal(cs.getAttribute('disabled'), null);
//         }); 

//         it('should set the url',() => {
//             cs.url='fake url';
//             assert.equal(cs.getAttribute('url'), 'fake url');
//         });  

//         it('should delete the url',() => {
//             cs.url='';
//             assert.equal(cs.getAttribute('url'), null);
//         }); 
//     });

//     it('should set the text area if we have bootstrap',() => {
//         cs.bootstrap='border border-secondary';
//         cs.url='fake u'
//         cs.connectedCallback();
//         const input = cs.shadowRoot.querySelector('input');
//         const link = cs.shadowRoot.querySelector('link');
//         assert.equal(input.getAttribute('class'),cs.bootstrap)
//         assert.equal(link.getAttribute('href'),cs.url);
//     });

//     it('should set the link by default if no bootstrap',() => {
//         cs.connectedCallback();
//         const link = cs.shadowRoot.querySelector('link');
//         assert.equal(link.getAttribute('href'),'inputbox-default-style.css');
//     });

//     it('should add a style if disabled',() => {
//         cs.disabled=true
//         cs.connectedCallback();
//         const style = cs.shadowRoot.querySelector('style');
//         assert.equal(style.innerHTML,'input {\n                opacity: 0.5!important;\n                cursor: not-allowed;\n                background-color: #ccc;\n            }')
//     });

//     it('should configurate size',() => {
//         cs.size='s';
//         cs.width=200;
//         cs.height=300;
//         cs.connectedCallback();
//         const style = cs.shadowRoot.querySelector('style');
//         assert.equal(style.innerHTML,'input {\n                width: 250px; height: 30px; font-size: 15px !important; padding: 5px 5px;\n            }input {\n                width: 200 !important; \n            }input {\n                height: 300 !important; \n            }')
//     })

//     it('should add a default style if no size given and not disabled',() => {
//         cs.disabled=false
//         cs.connectedCallback();
//         const style = cs.shadowRoot.querySelector('style');
//         assert.equal(style.innerHTML,'input {\n                width: 300px; height: 30px; font-size: 18px !important;\n            }')
//     });    
 });