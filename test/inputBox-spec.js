const assert = require('chai').assert

const inputBox = require('../web-component/inputBox');

describe('input-box element', () => {
    let cs;

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('input-box');        
    });

    it('creates element from document.createElement', () => {
        assert.equal('INPUT-BOX', cs.nodeName); 
    });

    it('should find input element in shadowDom', () => {
        cs.connectedCallback();
        const input = cs.shadowRoot.querySelector('input');
        
        assert.equal(input.getAttribute('id'), 'msg');
        assert.equal(input.getAttribute('name'), 'msg');
        assert.equal(input.getAttribute('value'), '');
    });
    describe('set and delete all the attributes', () => {
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

        it('should set the size',() => {
            cs.size=1;
            assert.equal(cs.getAttribute('size'), 1);
        });  

        it('should delete the size',() => {
            cs.size='';
            assert.equal(cs.getAttribute('size'), null);
        }); 

        it('should set the height',() => {
            cs.height=1;
            assert.equal(cs.getAttribute('height'), 1);
        });  

        it('should delete the height',() => {
            cs.height='';
            assert.equal(cs.getAttribute('height'), null);
        }); 

        it('should set the width',() => {
            cs.width=1;
            assert.equal(cs.getAttribute('width'), 1);
        });  

        it('should delete the width',() => {
            cs.width='';
            assert.equal(cs.getAttribute('width'), null);
        }); 

        it('should set the disabled',() => {
            cs.disabled=true;
            assert.equal(cs.getAttribute('disabled'), 'true');
        });  

        it('should delete the disabled ',() => {
        cs.disabled=false;
        assert.equal(cs.getAttribute('disabled'), null);
        }); 

        it('should set the url',() => {
            cs.url='fake url';
            assert.equal(cs.getAttribute('url'), 'fake url');
        });  

        it('should delete the url',() => {
            cs.url='';
            assert.equal(cs.getAttribute('url'), null);
        }); 
    });

    it('should set the text area if we have bootstrap',() => {
        cs.bootstrap='border border-secondary';
        cs.url='fake u'
        cs.connectedCallback();
        const input = cs.shadowRoot.querySelector('input');
        const link = cs.shadowRoot.querySelector('link');
        assert.equal(input.getAttribute('class'),cs.bootstrap)
        assert.equal(link.getAttribute('href'),cs.url);
    });

    it('should set the link by default if no bootstrap',() => {
        cs.connectedCallback();
        const link = cs.shadowRoot.querySelector('link');
        assert.equal(link.getAttribute('href'),'inputbox-default-style.css');
    });

    it('should add a style if disabled',() => {
        cs.disabled=true
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML,'input {\n                opacity: 0.5!important;\n                cursor: not-allowed;\n                background-color: #ccc;\n            }')
    });

    it('should configurate size',() => {
        cs.size='s';
        cs.width=200;
        cs.height=300;
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML,'input {\n                width: 250px; height: 30px; font-size: 15px !important; padding: 5px 5px;\n            }input {\n                width: 200 !important; \n            }input {\n                height: 300 !important; \n            }')
    })

    it('should add a default style if no size given and not disabled',() => {
        cs.disabled=false
        cs.connectedCallback();
        const style = cs.shadowRoot.querySelector('style');
        assert.equal(style.innerHTML,'input {\n                width: 300px; height: 30px; font-size: 18px !important;\n            }')
    }); 

    it('should trigger keypress',() => {
        cs.connectedCallback();
        const input = cs.shadowRoot.querySelector('input');
        const e=new KeyboardEvent('keypress',{'key':'13'});
        input.dispatchEvent(e)

    });
    
});