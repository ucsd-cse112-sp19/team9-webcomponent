const expect = require('chai').expect
const assert = require('chai').assert
const jsdom = require('jsdom-global')();
const doc = require('document-register-element');

const inputBox = require('../web-component/inputBox.js');
const outputStream = require('../web-component/outputStream.js');

describe('input-box element', () => {
  describe('element creation', () => {
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
  })

  describe("bootstrap attribute", function () {
    let cs;
    beforeEach(() => {
      cs = document.createElement('input-box');
      cs.setAttribute('url', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
      cs.setAttribute('bootstrap', 'text-danger');
      cs.connectedCallback();
    });
    it("checks if bootstrap text is set", function () {
      const input = cs.shadowRoot.querySelector('input');
      let text = input.getAttribute('class');
      assert.equal(input.getAttribute('name'), 'msg');
    });

  });
});


