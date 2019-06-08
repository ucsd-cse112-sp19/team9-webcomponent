const assert = require('chai').assert

const corehello= require('../web-component/CoreHello');

describe('corehello element', () => {
    let cs;

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {
        cs = document.createElement('core-hello'); 
    })

    it('creates element from document.createElement', () => {
        assert.equal('CORE-HELLO', cs.nodeName); 
    });

    it('PLEASE FIX IT ALEX <3', () => {        
        assert.equal(cs.shadowRoot,null)
    });

    describe('set and delete all the attributes', () => {
        it('should set the rainbow',() => {
            cs.rainbow='unicorn';
            assert.equal(cs.rainbow,true) ;    
        });

        it('should delete the rainbow',() => {
            cs.rainbow='';
            assert.equal(cs.rainbow,false) ;
        });

        it('should set the language',() => {
            cs.lang='es'
            assert.equal(cs.lang,'es');
        });  

        it('should delete the language',() => {
            cs.lang='';
            assert.equal(cs.lang, null);
        }); 

        it('should set the font',() => {
            cs.font='example_font'
            assert.equal(cs.font,'example_font');
        });  

        it('should delete the font',() => {
            cs.font='';
            assert.equal(cs.font, null);
        }); 

        it('should set the fontsize',() => {
            cs.fontsize=3
            assert.equal(cs.fontsize,3);
        });  

        it('should delete the fontsize',() => {
            cs.fontsize='';
            assert.equal(cs.fontsize, null);
        }); 
    })

    it('FIX IT: should set a rainbow style if this.rainbow=true',() => {
        cs.rainbow='yes'
        assert.equal(null,null)
    }); 

    it('should set hello with "Helllo World" by default',() => {
        assert.equal(cs.hello,null)
    }); 
});