const assert = require('chai').assert

const doc = require('document-register-element');

const inputRT = require('../web-component/inputRT');

describe('input-rt element', () => {
    let cs;
    let defaultStyle = "\nslot[name='messenger'] {\ndisplay: block;\n}\n";

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('input-rt');
    });

    afterEach(() => {
        document.write('');
    })

    it('creates element from document.createElement', () => {
        assert.equal('INPUT-RT', cs.nodeName);
    });

    describe('Instance variables should exist', () =>{
        it('4 slots should exist', () => {
            cs._init();
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
            cs._init();
            cs.connectedCallback();

            assert.equal(isBound(cs.send), true);
            assert.equal(isBound(cs.append),true);
            assert.equal(isBound(cs._onEnter),true);
        });
    });

    describe('Testing mode attribute', () =>{
        it('should find input element in shadowDom when set in default mode', () => {
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            let input = slot.querySelector('input');

            assert.equal(input.getAttribute('slot'), 'text');
        });

        it('should find input element in shadowDom when set in sender mode', () => {
            cs.setAttribute('mode','sender');
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            let input = slot.querySelector('input');
            assert.equal(input.getAttribute('slot'), 'text');
        });

        it('should find textarea element in shadowDom when set in textarea mode', () => {
            cs.setAttribute('mode','textarea');
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            let textarea = slot.querySelector('textarea');
            assert.equal(textarea.getAttribute('slot'),'text');
        });

        it('nothing should be set if custom attribute is set', () => {
            cs.setAttribute('mode','custom');
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");

            assert.equal(slot.innerHTML, '');
        });

        it('should find input element in shadowDom when set in sender mode by using this', () => {
            cs.mode = 'garbage';
            assert.equal(cs.mode, 'garbage');
            cs.mode = '';
            assert.equal(cs.mode, null);
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            let input = slot.querySelector('input');
            assert.equal(input.getAttribute('slot'), 'text');
        });

        it('should find input element in shadowDom when set in sender mode by using this', () => {
            cs.mode = 'sender';
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            let input = slot.querySelector('input');
            assert.equal(input.getAttribute('slot'), 'text');
        });

        it('should find textarea element in shadowDom when set in textarea mode by using this', () => {
            cs.mode = 'textarea';
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            let textarea = slot.querySelector('textarea');
            assert.equal(textarea.getAttribute('slot'),'text');
        });

        it('nothing should be set if custom attribute is set by using this', () => {
            cs.mode = 'custom';
            cs._init();
            cs.connectedCallback();
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            assert.equal(slot.innerHTML, '');
        });
    });

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
            cs._init();
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

        it('should not use send when disabled', () => {
            cs.setAttribute('mode','sender');
            cs._init();
            cs.connectedCallback();
            const msg = "test-message";
            const slot = cs.shadowRoot.querySelector("slot[name=text]");
            const input = slot.querySelector('input');
            input.value = msg;

            assert.equal(input.value, msg);
            cs.disabled = true;
            globalTest = "";
            let testEl = document.createElement('test-sender');
            testEl.setAttribute('slot','messenger');
            testEl.setAttribute('id', 'sender');
            cs.appendChild(testEl);            
            cs.send();

            assert.equal(globalTest, "");
            assert.equal(input.value, msg);
        });

        it('should fire if a button is appended', () => {
            cs.setAttribute('mode','sender');
            cs._init();
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

            //TODO: Design a better use case of when below would be
            // set as false
            cs.disconnectedCallback();
            assert.equal(globalTest, msg);
            assert.equal(input.value, '');

        });

        it('should properly call append', () => {
            cs.setAttribute('mode','textarea');
            cs._init();
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
            cs._init();
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
            cs._init();
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

    describe('set and delete all the attributes', () => {
        it('should find the bootstrap',() => {
            cs.setAttribute('boostrap','border border-secondary');
            assert.equal(cs.getAttribute('boostrap'),'border border-secondary') ;
        });

        it('should delete the bootstrap',() => {
            cs.bootstrap = '';
            assert.equal(cs.getAttribute('boostrap'), null);
        });

        it('should set the bootstrap',() => {
            cs.bootstrap = 'border border-secondary';
            assert.equal(cs.bootstrap,'border border-secondary');
        });

        it('should set the size',() => {
            cs.size = 1;
            assert.equal(cs.getAttribute('size'), 1);
        });

        it('should delete the size',() => {
            cs.size = '';
            assert.equal(cs.getAttribute('size'), null);
        });

        it('should set the height',() => {
            cs.height = 1;
            assert.equal(cs.getAttribute('height'), 1);
        });

        it('should delete the height',() => {
            cs.height = '';
            assert.equal(cs.getAttribute('height'), null);
        });

        it('should set the width',() => {
            cs.width = 1;
            assert.equal(cs.getAttribute('width'), 1);
        });

        it('should delete the width',() => {
            cs.width = '';
            assert.equal(cs.getAttribute('width'), null);
        });

        it('should set the disabled',() => {
            cs._init();
            cs.connectedCallback();
            cs.disabled = true;
            assert.equal(cs.getAttribute('disabled'), 'true');
        });

        it('should delete the disabled ',() => {
            cs.disabled = false;
            assert.equal(cs.getAttribute('disabled'), null);
        });

        it('should set the placeholder ',() => {
            cs.placeholder = "Type your message here";
            assert.equal(cs.getAttribute('placeholder'), "Type your message here");
        });

        it('should set the url',() => {
            cs.url = 'fake url';
            assert.equal(cs.getAttribute('url'), 'fake url');
        });

        it('should delete the url',() => {
            cs.url = '';
            assert.equal(cs.getAttribute('url'), null);
        });

        it('should set password attribute',() => {
            cs.password = true;
            assert.equal(cs.getAttribute('password'), 'true');
        });

        it('should set password attribute then unset',() => {
            cs.password = true;
            assert.equal(cs.getAttribute('password'), 'true');
            cs.password = false;
            assert.equal(cs.getAttribute('password'), null);
        });
    });

    it('should set the input if we have bootstrap',() => {
        cs.bootstrap = 'border border-secondary';
        cs.url = 'fake u';
        cs._init();
        cs.connectedCallback();
        const input = cs.shadowRoot.querySelector('input');
        const link = cs.shadowRoot.querySelector('link');
        assert.equal(input.getAttribute('class'),cs.bootstrap);
        assert.equal(link.getAttribute('href'),cs.url);
    });

    it('should set placeholder attribute in input mode',() => {
        const msg = 'this is a placeholder';
        cs.placeholder = msg;
        cs._init();
        cs.connectedCallback();
        const slot = cs.shadowRoot.querySelector("slot[name=text]");
        let input = slot.querySelector('input');
        assert.equal(input.getAttribute('slot'), 'text');
        assert.equal(input.getAttribute('placeholder'), msg)
    });

    it('should set placeholder attribute in sender mode',() => {
        const msg = 'this is a placeholder';
        cs.placeholder = msg;
        cs.mode = "sender";
        cs._init();
        cs.connectedCallback();
        const slot = cs.shadowRoot.querySelector("slot[name=text]");
        let input = slot.querySelector('input');
        assert.equal(input.getAttribute('slot'), 'text');
        assert.equal(input.getAttribute('placeholder'), msg)
    });

    it('should not set placeholder attribute in textarea mode',() => {
        const msg = 'this is a placeholder';
        cs.placeholder = msg;
        cs.mode = "textarea";
        cs._init();
        cs.connectedCallback();
        const slot = cs.shadowRoot.querySelector("slot[name=text]");
        let textarea = slot.querySelector('textarea');
        assert.equal(textarea.getAttribute('slot'), 'text');
        assert.isNull(textarea.getAttribute('placeholder'));
    });

    it('should set the link by default if no bootstrap',() => {
        cs._init();
        cs.connectedCallback();
        const link = cs.shadowRoot.querySelector('link');
        assert.equal(link.getAttribute('href'),'inputbox-rt-default-style.css');
    });

    it('should add a style if disabled',() => {
        cs._init();
        cs.connectedCallback();
        cs.disabled = true;
        const style = cs.shadowRoot.querySelector('style#disabledStyle');
        assert.equal(style.innerHTML, '\ninput[disabled] {\nopacity: 0.5 !important; cursor: not-allowed; background-color: #ccc;\n}\n');
    });

    it('should add a style if disabled then remove the style if disabled is removed',() => {
        cs._init();
        cs.connectedCallback();
        cs.disabled = true;
        let style = cs.shadowRoot.querySelector('style#disabledStyle');
        assert.equal(style.innerHTML, '\ninput[disabled] {\nopacity: 0.5 !important; cursor: not-allowed; background-color: #ccc;\n}\n');
        cs.attributeChangedCallback('disabled',true,false); 
        style = cs.shadowRoot.querySelector('style#disabledStyle');
        assert.isNull(style);
    });

    it('should add disabledStyle once only',() => {
        cs._init();
        cs.connectedCallback();
        cs.disabled = true; 
        cs.attributeChangedCallback('disabled', true, true);
        const style = cs.shadowRoot.querySelectorAll('style#disabledStyle');
        assert.equal(style.length, 1);
    });

    it('should not remove non-existent style attribute',() => {
        cs._init();
        cs.connectedCallback();
        cs.disabled = true; 
        let style = cs.shadowRoot.querySelector('style#disabledStyle');
        assert.isNotNull(style); 
        cs._remove_attribute_style('randomAttrName'); 
        style = cs.shadowRoot.querySelector('style#disabledStyle');
        assert.isNotNull(style);
        cs.attributeChangedCallback('disabled', true, false); 
        style = cs.shadowRoot.querySelector('style#disabledStyle');
        assert.isNull(style);
    });

    it('should configure width and height while size is set',() => {
        cs.size = 's';
        cs.width = 200;
        cs.height = 300;
        cs._init();
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML, defaultStyle+'input {\nwidth: 200 !important;\n}\ninput {\nheight: 300 !important;\n}\ninput {\nwidth: 300px; height: 30px; font-size: 12px !important;\n}\n');
    });

    it('should configure width and height',() => {
        cs.width = 200;
        cs.height = 300;
        cs._init();
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML, defaultStyle+'input {\nwidth: 200 !important;\n}\ninput {\nheight: 300 !important;\n}\ninput {\nwidth: 300px; height: 30px; font-size: 12px !important;\n}\n');
    });

    it('should not configure width and height in custom mode',() => {
        cs.mode = "custom";
        cs.width = 200;
        cs.height = 300;
        cs._init();
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML, defaultStyle);
    });

    it('should configure size',() => {
        cs.size = 's';
        cs._init();
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML, defaultStyle+'input {\nwidth: 250px; height: 30px; font-size: 12px !important; padding: 5px 5px;\n}\n');
    });

    it('should not configure size in custom mode',() => {
        cs.mode = "custom";
        cs.size = 's';
        cs._init();
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML, defaultStyle);
    });

    it('should configure password',() => {
        cs.password = true;
        cs._init();
        cs.connectedCallback();

        const slot = cs.shadowRoot.querySelector("slot[name=text]");
        let input = slot.querySelector('input');
        assert.equal(input.getAttribute('type'), 'password');
    });

    it('should not configure password in textarea mode',() => {
        cs.mode = "textarea";
        cs.password = true;
        cs._init();
        cs.connectedCallback();

        const slot = cs.shadowRoot.querySelector("slot[name=text]");
        let textarea = slot.querySelector('textarea');
        assert.equal(textarea.getAttribute('type'), null);
    });

    it('should add a default style if no size given and not disabled',() => {
        cs.disabled = false;
        cs._init();
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML, defaultStyle+'input {\nwidth: 300px; height: 30px; font-size: 12px !important;\n}\n');
    });
 });
