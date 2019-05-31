const expect = require('chai').expect
const assert = require('chai').assert
const jsdom = require('jsdom-global')();
const doc = require('document-register-element');

const inputBox = require('../web-component/inputBox.js');

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
  });

});

// unit test for output-stream TODO: remove when commiting 
describe('output-stream element', () => {
  let cs;
  before(() => {

  });

  after(() => {

  });

  beforeEach(() => {
    cs = document.createElement('output-stream');
    cs.connectedCallback();
  });

  it('creates element from document.createElement', () => {
    assert.equal('OUTPUT-STREAM', cs.nodeName);
  });

  it('should find input element in shadowDom', () => {
    const input = cs.shadowRoot.querySelector('link');
    assert.equal(input.getAttribute('rel'), 'stylesheet');
    assert.equal(input.getAttribute('type'), 'text/css');
  });
});



